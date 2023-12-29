"use server";
import { encryptText, hashText } from "@/helper/encryption";
import prisma from "../prisma/client";
import { BoostResponse, BoostVersion, FeedbackObject } from "@/types/apiCalls";
import { Feedback, ResumeBoost } from "@prisma/client";
import { MixpanelBack } from "@/services/mixpanelBack";
import { MontioringErrorTypes } from "@/types/monitoring/errors";

export async function saveBoostResponseToDB(
  boostResponse: BoostResponse,
  userId: string,
): Promise<ResumeBoost> {
  try {
    const secret = process.env.ENCRYPTION_SEED
      ? process.env.ENCRYPTION_SEED
      : "";
    if (secret === "") {
      throw new Error(
        "Encryption seed not found while saving boost response to DB",
      );
    }
    const boostHash = hashText(boostResponse.resume_text);
    const maybeBoost = await prisma.resumeBoost.findFirst({
      where: {
        resumeHash: boostHash,
      },
    });
    if (maybeBoost) {
      return maybeBoost;
    }

    const resumeBoostData = {
      userId: userId,
      resumeText: encryptText(boostResponse.resume_text, secret),
      boostVersion: BoostVersion.V1,
      resumeHash: boostHash,
    };

    const feedbacks: any[] = [];
    for (const key of Object.keys(boostResponse)) {
      if (key !== "resume_text" && key !== "edited_lines") {
        const feedbackObject = boostResponse[
          key as keyof BoostResponse
        ] as FeedbackObject;
        feedbacks.push({
          feedbackType: feedbackObject.feedback_type,
          feedbackText: encryptText(feedbackObject.data.feedback, secret),
          feedbackTextReference: null,
          isLiked: false,
          score: feedbackObject.data.score,
        });
      }
    }

    for (const editedLine of boostResponse.edited_lines) {
      feedbacks.push({
        feedbackType: editedLine.feedback_type,
        feedbackText: encryptText(editedLine.data.new_line, secret),
        feedbackTextReference: encryptText(editedLine.data.old_line, secret),
        isLiked: false,
      });
    }

    const { boost } = await prisma.$transaction(
      async (prisma) => {
        const boost = await prisma.resumeBoost.create({
          data: resumeBoostData,
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            resumeBoostsAvailable: {
              decrement: 1,
            },
          },
        });

        const feedbacksPromises = feedbacks.map((feedback) =>
          prisma.feedback.create({
            data: {
              ...feedback,
              boostId: boost.boostId,
            },
          }),
        );
        await Promise.all(feedbacksPromises);
        return { boost };
      },
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );
    return boost;
  } catch (error) {
    MixpanelBack.getInstance().track(
      MontioringErrorTypes.SAVE_BOOST_RESPONSE_TO_DB_ERROR,
      {
        error: error,
      },
    );
    throw error;
  }
}

export async function isEligibleForBoost(userId?: string): Promise<boolean> {
  if (!userId) {
    return false;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error(`User not found for id: ${userId}`);
    }
    return user.resumeBoostsAvailable > 0;
  } catch (error) {
    MixpanelBack.getInstance().track(
      MontioringErrorTypes.IS_ELIGIBLE_FOR_BOOST_ERROR,
      {
        error: error,
      },
    );
    throw error;
  }
}
