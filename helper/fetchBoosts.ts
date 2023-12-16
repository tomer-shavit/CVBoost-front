import {
  WrappedBoost,
  EditedLine,
  Feedback as ApiFeedback,
  FeedbackType,
  BoostResponse,
  emptyBoostResponse,
} from "@/types/apiCalls";
import { Feedback, Session } from "@prisma/client";
import prisma from "../prisma/client";
import { decryptText } from "./decrypt";

const dbEditedLineToApiEditedLine = (
  dbEditedLine: Feedback,
  key: string,
): EditedLine => {
  return {
    feedbackId: dbEditedLine.feedbackId,
    isLiked: dbEditedLine.isLiked,
    old_line: dbEditedLine.feedbackTextReference
      ? decryptText(dbEditedLine.feedbackTextReference, key)
      : "Fail",
    new_line: dbEditedLine.feedbackText
      ? decryptText(dbEditedLine.feedbackText, key)
      : "no text",
  };
};

const dbFeedbackToApiFeedback = (
  dbFeedback: Feedback,
  key: string,
): ApiFeedback => {
  return {
    feedbackId: dbFeedback.feedbackId,
    feedbackType: dbFeedback.feedbackType,
    isLiked: dbFeedback.isLiked,
    feedback: dbFeedback.feedbackText
      ? decryptText(dbFeedback.feedbackText, key)
      : "",
    score: dbFeedback.score ? dbFeedback.score : 0,
  };
};

const isEditedLines = (feedbackType: number): boolean =>
  feedbackType === FeedbackType.REPHRASE;

const buildApiBoost = (
  boostId: number,
  feedbacks: ApiFeedback[],
  editedLines: EditedLine[],
): BoostResponse => {
  const boost = emptyBoostResponse;
  boost.boost_id = boostId.toString();
  boost.edited_lines = editedLines;
  feedbacks.forEach((feedback) => {
    switch (feedback.feedbackType) {
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
    const editedLines: EditedLine[] = [];
    const feedbacks: ApiFeedback[] = [];

    boost.feedbacks.forEach((feedback) => {
      if (isEditedLines(feedback.feedbackType)) {
        editedLines.push(dbEditedLineToApiEditedLine(feedback, key));
      } else {
        feedbacks.push(dbFeedbackToApiFeedback(feedback, key));
      }
    });
    return {
      boost: buildApiBoost(boost.boostId, feedbacks, editedLines),
    };
  } catch (error) {
    return { error: error.message };
  }
};
