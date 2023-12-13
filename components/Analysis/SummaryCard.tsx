import { GptApiResponse } from "../../types/apiCalls";
import { useEffect, useState } from "react";
import AnalysisParagraph from "./AnalysisParagraph";
import Card from "./Card";
import SubCard from "./SubCard";
import { FEEDBACKS_AMOUNT } from "../../constants/analysis";

const SummaryView: React.FC<{ data: GptApiResponse }> = ({ data }) => {
  const [score, setScore] = useState<number>();

  useEffect(() => {
    const totalScore =
      (data.clarity.score +
        data.relevance.score +
        data.achievements.score +
        data.keywords.score) /
      FEEDBACKS_AMOUNT;
    setScore(totalScore);
  }, [data]);
  return (
    <Card>
      <div className="flex flex-col lg:flex-row">
        <h5 className="text-3xl font-extrabold leading-tight text-blackho dark:text-white lg:pr-2">
          Total Score:
        </h5>
        <h5 className="mb-4 text-3xl font-extrabold leading-tight  text-blackho dark:text-white">
          <span className="text-green-400">{score}</span> / 100
        </h5>
      </div>
      <SubCard last>
        <AnalysisParagraph text={data.summary}></AnalysisParagraph>
      </SubCard>
    </Card>
  );
};
export default SummaryView;
