import prisma from "@/prisma/client";
import {
  WrappedUserPreview,
  FeedbackObject as ApiFeedback,
  BoostResponse,
  EditedLineObject,
} from "@/types/apiCalls";
import {
  buildApiBoost,
  dbEditedLineToApiEditedLine,
  dbFeedbackToApiFeedback,
  isEditedLines,
} from "./fetchBoosts";

const buildUserPreview = (
  id: string,
  name: string | null,
  resumeBoostsAvailable: number,
  resumeBoostsTotal: number,
  resumeBoosts: BoostResponse[],
) => {
  return {
    id: id,
    name: name,
    resumeBoostsAvailable: resumeBoostsAvailable,
    resumeBoostsTotal: resumeBoostsTotal,
    resumeBoosts: resumeBoosts,
  };
};

export const fetchUser = async (
  userId: string | undefined,
  key: string,
): Promise<WrappedUserPreview> => {
  if (!userId) {
    return { error: "No session" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId, // replace 'userId' with the actual user ID you're querying
      },
      include: {
        resumeBoosts: {
          include: {
            feedbacks: true,
          },
        },
        subscriptions: {
          where: {
            status: "active",
          },
        },
      },
    });

    if (!user) {
      return { error: `No user was found with the Id: ${userId}` };
    }
    const boosts: BoostResponse[] = [];
    user.resumeBoosts.forEach((boost) => {
      const editedLines: EditedLineObject[] = [];
      const feedbacks: ApiFeedback[] = [];

      boost.feedbacks.forEach((feedback) => {
        if (isEditedLines(feedback.feedbackType)) {
          editedLines.push(
            dbEditedLineToApiEditedLine(
              feedback,
              key,
              user.subscriptions.length > 0,
            ),
          );
        } else {
          feedbacks.push(
            dbFeedbackToApiFeedback(
              feedback,
              key,
              user.subscriptions.length > 0,
            ),
          );
        }
      });
      boosts.push(
        buildApiBoost(boost.boostId, boost.createdAt, feedbacks, editedLines),
      );
    });

    return {
      userPreview: buildUserPreview(
        user.id,
        user.name,
        user.resumeBoostsAvailable,
        user.resumeBoostsTotal,
        boosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      ),
    };
  } catch (error) {
    return { error: error.message };
  }
};
