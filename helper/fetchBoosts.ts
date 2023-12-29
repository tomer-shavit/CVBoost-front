import {
  WrappedBoost,
  EditedLineObject,
  FeedbackObject as ApiFeedback,
  FeedbackType,
  BoostResponse,
  emptyBoostResponse,
} from "@/types/apiCalls";
import { Feedback, Session } from "@prisma/client";
import prisma from "../prisma/client";
import { decryptText } from "./encryption";

export const dbEditedLineToApiEditedLine = (
  dbEditedLine: Feedback,
  key: string,
): EditedLineObject => {
  return {
    feedbackId: dbEditedLine.feedbackId,
    feedback_type: dbEditedLine.feedbackType,
    isLiked: dbEditedLine.isLiked,
    data: {
      old_line: dbEditedLine.feedbackTextReference
        ? decryptText(dbEditedLine.feedbackTextReference, key)
        : "Fail",
      new_line: dbEditedLine.feedbackText
        ? decryptText(dbEditedLine.feedbackText, key)
        : "no text",
    },
  };
};

export const dbFeedbackToApiFeedback = (
  dbFeedback: Feedback,
  key: string,
): ApiFeedback => {
  return {
    feedbackId: dbFeedback.feedbackId,
    feedback_type: dbFeedback.feedbackType,
    isLiked: dbFeedback.isLiked,
    data: {
      feedback: dbFeedback.feedbackText
        ? decryptText(dbFeedback.feedbackText, key)
        : "",
      score: dbFeedback.score ? dbFeedback.score : 0,
    },
  };
};

export const isEditedLines = (feedbackType: number): boolean =>
  feedbackType === FeedbackType.REPHRASE;

export const buildApiBoost = (
  boostId: number,
  createdAt: Date,
  feedbacks: ApiFeedback[],
  editedLines: EditedLineObject[],
): BoostResponse => {
  const boost = emptyBoostResponse;
  boost.boostId = boostId;
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
      case FeedbackType.SUMMARY:
        boost.summary = feedback;
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
        editedLines.push(dbEditedLineToApiEditedLine(feedback, key));
      } else {
        feedbacks.push(dbFeedbackToApiFeedback(feedback, key));
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
