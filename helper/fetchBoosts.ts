import {
  WrappedBoost,
  EditedLineObject,
  FeedbackObject as ApiFeedback,
  FeedbackType,
  BoostResponse,
  createEmptyBoostResponse,
} from "@/types/apiCalls";
import { Feedback, Session } from "@prisma/client";
import prisma from "../prisma/client";
import { decryptText } from "./encryption";

export const dbEditedLineToApiEditedLine = (
  dbEditedLine: Feedback,
  key: string,
  isFull: boolean,
): EditedLineObject => {
  return {
    feedbackId: dbEditedLine.feedbackId,
    feedback_type: dbEditedLine.feedbackType,
    isFull: isFull,
    isLiked: dbEditedLine.isLiked,
    data: {
      old_line: dbEditedLine.feedbackTextReference
        ? decryptText(dbEditedLine.feedbackTextReference, key)
        : "Fail",
      new_line:
        dbEditedLine.feedbackText && isFull
          ? decryptText(dbEditedLine.feedbackText, key)
          : "Upgrade your plan to see the improved version.",
    },
  };
};

export const dbFeedbackToApiFeedback = (
  dbFeedback: Feedback,
  key: string,
  isFull: boolean,
): ApiFeedback => {
  return {
    feedbackId: dbFeedback.feedbackId,
    feedback_type: dbFeedback.feedbackType,
    isFull: isFull || dbFeedback.feedbackType === FeedbackType.GENERAL_FEEDBACK,
    isLiked: dbFeedback.isLiked,
    data: {
      feedback:
        isFull || dbFeedback.feedbackType === FeedbackType.GENERAL_FEEDBACK
          ? decryptText(dbFeedback.feedbackText, key)
          : cutStringAtHowever(decryptText(dbFeedback.feedbackText, key)),
      score: dbFeedback.score ? dbFeedback.score : 0,
    },
  };
};

function cutStringAtHowever(text: string): string {
  const words = text.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (
      words[i].toLowerCase() === "however" ||
      words[i].toLowerCase() === "however,"
    ) {
      words[i] = words[i].replace(",", "");
      return words.slice(0, i + 1).join(" ") + "...";
    }
  }

  return words.slice(0, 18).join(" ") + "...";
}

export const isEditedLines = (feedbackType: number): boolean =>
  feedbackType === FeedbackType.REPHRASE;

export const buildApiBoost = (
  boostId: number,
  createdAt: Date,
  feedbacks: ApiFeedback[],
  editedLines: EditedLineObject[],
): BoostResponse => {
  const boost = createEmptyBoostResponse();
  boost.boostId = boostId;
  boost.createdAt = createdAt;
  boost.edited_lines = editedLines;
  feedbacks.forEach((feedback) => {
    switch (feedback.feedback_type) {
      case FeedbackType.CLARITY:
        boost.clarity = feedback;
        break;
      case FeedbackType.RELEVANCE:
        boost.relevance = feedback;
        break;
      case FeedbackType.ACHIEVEMENTS:
        boost.achievements = feedback;
        break;
      case FeedbackType.KEYWORDS:
        boost.keywords = feedback;
        break;
      case FeedbackType.GENERAL_FEEDBACK:
        boost.general_feedback = feedback;
        break;
    }
  });

  return boost;
};

export const fetchBoost = async (
  boostId: number,
  userId: string | undefined,
  key: string,
): Promise<WrappedBoost> => {
  if (!userId) {
    return { error: "No session" };
  }

  try {
    const boost = await prisma.resumeBoost.findUnique({
      where: { boostId },
      include: { feedbacks: true },
    });

    const activeSubscriptions = await prisma.subscription.findMany({
      where: { userId: userId, status: "active" },
    });

    const isFull = activeSubscriptions.length > 0;

    if (!boost) {
      return { error: "No boost found" };
    }
    if (boost.userId !== userId) {
      return { error: "Not authorized" };
    }
    const editedLines: EditedLineObject[] = [];
    const feedbacks: ApiFeedback[] = [];

    boost.feedbacks.forEach((feedback) => {
      if (isEditedLines(feedback.feedbackType)) {
        editedLines.push(
          dbEditedLineToApiEditedLine(
            feedback,
            key,
            isFull || editedLines.length === 0,
          ),
        );
      } else {
        feedbacks.push(
          dbFeedbackToApiFeedback(
            feedback,
            key,
            isFull || feedbacks.length === 0,
          ),
        );
      }
    });
    return {
      boost: buildApiBoost(
        boost.boostId,
        boost.createdAt,
        feedbacks,
        editedLines,
      ),
    };
  } catch (error) {
    return { error: error.message };
  }
};
