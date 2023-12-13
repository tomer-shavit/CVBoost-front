type EditedLine = {
  old_line: string;
  new_line: string;
};

type Feedback = {
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
  summary: string;
};

export const emptyGptApiResponse: GptApiResponse = {
  boost_id: "",
  edited_lines: [],
  clarity: { feedback: "", score: 0 },
  relevance: { feedback: "", score: 0 },
  achievements: { feedback: "", score: 0 },
  keywords: { feedback: "", score: 0 },
  summary: "",
};
