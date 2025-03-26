export enum FeedbackType {
  REPHRASE = 1,
  CLARITY = 2,
  RELEVANCE = 3,
  ACHIEVEMENTS = 4,
  KEYWORDS = 5,
  GENERAL_FEEDBACK = 6,
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
  isFull: boolean;
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
  isFull: boolean;
  isLiked: boolean;
  feedback_type: FeedbackType;
  data: Feedback;
};

export type BoostResponse = {
  boostId: number;
  resume_text: string;
  created_at: Date;
  clarity: FeedbackObject;
  relevance: FeedbackObject;
  achievements: FeedbackObject;
  keywords: FeedbackObject;
  general_feedback: FeedbackObject;
  edited_lines: EditedLineObject[];
  createdAt: Date;
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

export const createEmptyBoostResponse = (): BoostResponse => {
  return {
    boostId: 0,
    edited_lines: [],
    created_at: new Date(),
    clarity: {
      feedbackId: 0,
      isFull: false,
      feedback_type: FeedbackType.CLARITY,
      isLiked: false,
      data: {
        feedback: "",
        score: 0,
      },
    },
    relevance: {
      feedbackId: 0,
      isFull: false,
      feedback_type: FeedbackType.RELEVANCE,
      isLiked: false,
      data: {
        feedback: "",
        score: 0,
      },
    },
    achievements: {
      feedbackId: 0,
      isFull: false,
      feedback_type: FeedbackType.ACHIEVEMENTS,
      isLiked: false,
      data: {
        feedback: "",
        score: 0,
      },
    },
    keywords: {
      feedbackId: 0,
      isFull: false,
      feedback_type: FeedbackType.KEYWORDS,
      isLiked: false,
      data: {
        feedback: "",
        score: 0,
      },
    },
    general_feedback: {
      feedbackId: 0,
      isFull: false,
      feedback_type: FeedbackType.GENERAL_FEEDBACK,
      isLiked: false,
      data: {
        feedback: "",
        score: 0,
      },
    },
    resume_text: "",
    createdAt: new Date(),
  };
};
