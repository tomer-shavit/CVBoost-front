type EditedLine = {
  feedbackId: number;
  old_line: string;
  new_line: string;
};

export type Feedback = {
  feedbackId: number;
  feedback: string;
  score: number;
};

export type GptApiResponse = {
  boost_id: string;
  edited_lines: EditedLine[];
  clarity: Feedback;
  relevance: Feedback;
  achievements: Feedback;
  keywords: Feedback;
  summary: Feedback;
};

export const emptyGptApiResponse: GptApiResponse = {
  boost_id: "",
  edited_lines: [],
  clarity: { feedbackId: 0, feedback: "", score: 0 },
  relevance: { feedbackId: 0, feedback: "", score: 0 },
  achievements: { feedbackId: 0, feedback: "", score: 0 },
  keywords: { feedbackId: 0, feedback: "", score: 0 },
  summary: { feedbackId: 0, feedback: "", score: 0 },
};
