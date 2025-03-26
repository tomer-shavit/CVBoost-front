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
      <SubCard last className="relative" isFull={data.general_feedback.isFull}>
        <Like
          boostId={data.boostId}
          isLiked={data.general_feedback.isLiked}
          feedbackId={data.general_feedback.feedbackId}
          className="absolute bottom-4 right-4"
        />
        <AnalysisParagraph
          text={data.general_feedback.data.feedback}
        ></AnalysisParagraph>
      </SubCard>
    </Card>
  );
};
export default SummaryView;
