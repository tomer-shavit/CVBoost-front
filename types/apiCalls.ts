export enum FeedbackType {
  REPHRASE = 1,
  CLARITY = 2,
  RELEVANCE = 3,
  ACHIEVEMENTS = 4,
  KEYWORDS = 5,
  SUMMARY = 6,
}

export type EditedLine = {
  feedbackId: number;
  isLiked: boolean;
  old_line: string;
  new_line: string;
};

export type Feedback = {
  feedbackId: number;
  feedbackType: FeedbackType;
  isLiked: boolean;
  feedback: string;
  score: number;
};

export type BoostResponse = {
  boost_id: string;
  created_at: Date;
  edited_lines: EditedLine[];
  clarity: Feedback;
  relevance: Feedback;
  achievements: Feedback;
  keywords: Feedback;
  summary: Feedback;
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
  boost_id: "",
  edited_lines: [],
  created_at: new Date(),
  clarity: {
    feedbackId: 0,
    isLiked: false,
    feedbackType: FeedbackType.CLARITY,
    feedback: "",
    score: 0,
  },
  relevance: {
    feedbackId: 0,
    isLiked: false,
    feedback: "",
    feedbackType: FeedbackType.RELEVANCE,
    score: 0,
  },
  achievements: {
    feedbackId: 0,
    isLiked: false,
    feedback: "",
    feedbackType: FeedbackType.ACHIEVEMENTS,
    score: 0,
  },
  keywords: {
    feedbackId: 0,
    isLiked: false,
    feedback: "",
    feedbackType: FeedbackType.KEYWORDS,
    score: 0,
  },
  summary: {
    feedbackId: 0,
    isLiked: false,
    feedback: "",
    feedbackType: FeedbackType.SUMMARY,
    score: 0,
  },
};
