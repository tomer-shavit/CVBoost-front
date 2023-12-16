"use client";
import { BoostResponse } from "../../types/apiCalls";
import { useEffect, useState } from "react";
import AnalysisParagraph from "./AnalysisParagraph";
import Card from "./Card";
import SubCard from "./SubCard";
import { FEEDBACKS_AMOUNT } from "../../constants/analysis";
import { useParams } from "next/navigation";
import { Like } from "./Like";
import { Score } from "./Score";

const SummaryView: React.FC<{ data: BoostResponse }> = ({ data }) => {
  return (
    <Card>
      <Score boost={data}></Score>
      <SubCard last className="relative">
        <Like
          boostId={data.boost_id}
          isLiked={data.summary.isLiked}
          feedbackId={data.summary.feedbackId}
          className="absolute bottom-4 right-4"
        />
        <AnalysisParagraph text={data.summary.feedback}></AnalysisParagraph>
      </SubCard>
    </Card>
  );
};
export default SummaryView;
