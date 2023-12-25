export enum FeedbackType {
  REPHRASE = 1,
  CLARITY = 2,
  RELEVANCE = 3,
  ACHIEVEMENTS = 4,
  KEYWORDS = 5,
  SUMMARY = 6,
}
export enum BoostVersion {
  V1 = 1,
}
export type EditedLine = {
  old_line: string;
  new_line: string;
};
export type EditedLineObject = {
  feedbackId: number;
  isLiked: boolean;
  feedback_type: FeedbackType;
  data: EditedLine;
};

export type Feedback = {
  feedback: string;
  score: number;
};

export type FeedbackObject = {
  feedbackId: number;
  isLiked: boolean;
  feedback_type: FeedbackType;
  data: Feedback;
};

export type BoostResponse = {
  boostId: number;
  resume_text: string;
  clarity: FeedbackObject;
  relevance: FeedbackObject;
  achievements: FeedbackObject;
  keywords: FeedbackObject;
  summary: FeedbackObject;
  edited_lines: EditedLineObject[];
};

export type WrappedUserPreview = {
  userPreview?: UserPreview;
  error?: string;
};

export type UserPreview = {
  id: string;
  name: string | null;
  resumeBoostsAvailable: number;
  resumeBoostsTotal: number;
  resumeBoosts: BoostResponse[];
};

export const emptyUserPreview: UserPreview = {
  id: "",
  name: "",
  resumeBoostsAvailable: 0,
  resumeBoostsTotal: 0,
  resumeBoosts: [],
};

export type WrappedBoost = {
  boost?: BoostResponse; // Define a more specific type for your Boost object
  error?: string;
};

export const emptyBoostResponse: BoostResponse = {
  boostId: 0,
  edited_lines: [],
  clarity: {
    feedbackId: 0,
    feedback_type: FeedbackType.CLARITY,
    isLiked: false,
    data: {
      feedback: "",
      score: 0,
    },
  },
  relevance: {
    feedbackId: 0,
    feedback_type: FeedbackType.RELEVANCE,
    isLiked: false,
    data: {
      feedback: "",
      score: 0,
    },
  },
  achievements: {
    feedbackId: 0,
    feedback_type: FeedbackType.ACHIEVEMENTS,
    isLiked: false,
    data: {
      feedback: "",
      score: 0,
    },
  },
  keywords: {
    feedbackId: 0,
    feedback_type: FeedbackType.KEYWORDS,
    isLiked: false,
    data: {
      feedback: "",
      score: 0,
    },
  },
  summary: {
    feedbackId: 0,
    feedback_type: FeedbackType.SUMMARY,
    isLiked: false,
    data: {
      feedback: "",
      score: 0,
    },
  },
  resume_text: "",
};
