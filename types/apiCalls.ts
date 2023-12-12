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
