import { GptApiResponse } from "../../types/apiCalls";
import { useEffect, useState } from "react";
import AnalysisSubTitle from "./AnalysisSubTitle";
import AnalysisParagraph from "./AnalysisParagraph";
import { HiOutlineLightningBolt } from "react-icons/hi";
import SubCard from "./SubCard";
import Card from "./Card";
import { FEEDBACKS_AMOUNT } from "../../constants/analysis";

const FeedbackCard: React.FC<{ data: GptApiResponse }> = ({ data }) => {
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
      <h5 className="mb-8 flex items-center text-3xl font-extrabold leading-tight text-neutral-100">
        <span className="mr-2 inline-block ">
          <HiOutlineLightningBolt />
        </span>
        Analysis:
      </h5>
      <SubCard>
        <AnalysisSubTitle title="Clarity"></AnalysisSubTitle>
        <AnalysisParagraph text={data.clarity.feedback}></AnalysisParagraph>
        <div className="mb-2 h-2 w-full rounded-full bg-gray-500">
          <div
            className="h-full rounded-full bg-blue-400/80 text-center text-xs text-white"
            style={{ width: data.clarity.score + "%" }}
          ></div>
        </div>
      </SubCard>

      <SubCard>
        <AnalysisSubTitle title="Relevance"></AnalysisSubTitle>
        <AnalysisParagraph text={data.relevance.feedback}></AnalysisParagraph>
        <div className="mb-2 h-2 w-full rounded-full bg-gray-500">
          <div
            className="h-full rounded-full bg-green-400/80 text-center text-xs text-white"
            style={{ width: data.relevance.score + "%" }}
          ></div>
        </div>
      </SubCard>
      <SubCard>
        <AnalysisSubTitle title="Achievements"></AnalysisSubTitle>
        <AnalysisParagraph
          text={data.achievements.feedback}
        ></AnalysisParagraph>
        <div className="mb-2 h-2 w-full rounded-full bg-gray-500">
          <div
            className="h-full rounded-full bg-yellow-400/80 text-center text-xs text-white"
            style={{ width: data.achievements.score + "%" }}
          ></div>
        </div>
      </SubCard>
      <SubCard last>
        <AnalysisSubTitle title="Keywords"></AnalysisSubTitle>
        <AnalysisParagraph text={data.keywords.feedback}></AnalysisParagraph>
        <div className="mb-2 h-2 w-full rounded-full bg-gray-500">
          <div
            className="h-full rounded-full bg-fuchsia-400/80 text-center text-xs text-white"
            style={{ width: data.keywords.score + "%" }}
          ></div>
        </div>
      </SubCard>
    </Card>
  );
};

export default FeedbackCard;
