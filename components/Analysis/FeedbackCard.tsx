"use client";
import { BoostResponse } from "../../types/apiCalls";
import { useEffect, useState } from "react";
import AnalysisSubTitle from "./AnalysisSubTitle";
import AnalysisParagraph from "./AnalysisParagraph";
import { HiOutlineLightningBolt } from "react-icons/hi";
import SubCard from "./SubCard";
import Card from "./Card";
import { Like } from "./Like";

const FeedbackCard: React.FC<{ data: BoostResponse }> = ({ data }) => {
  return (
    <Card>
      <h5 className="mb-8 flex items-center text-3xl font-extrabold leading-tight text-blackho dark:text-white">
        <span className="mr-2 inline-block ">
          <HiOutlineLightningBolt />
        </span>
        Analysis:
      </h5>
      <SubCard isFull={data.clarity.isFull}>
        <AnalysisSubTitle title="Clarity"></AnalysisSubTitle>
        <AnalysisParagraph
          text={data.clarity.data.feedback}
        ></AnalysisParagraph>
        <div className="flex w-full flex-row items-center justify-center">
          <div className="mb-2 h-2 w-full rounded-full bg-slate-300 dark:bg-gray-500">
            <div
              className="h-full rounded-full bg-blue-400/80 text-center text-xs text-white"
              style={{ width: data.clarity.data.score + "%" }}
            ></div>
          </div>
          <Like
            className="pb-2 pl-3"
            boostId={data.boostId}
            feedbackId={data.clarity.feedbackId}
            isLiked={data.clarity.isLiked}
          />
        </div>
      </SubCard>

      <SubCard isFull={data.relevance.isFull}>
        <AnalysisSubTitle title="Relevance"></AnalysisSubTitle>
        <AnalysisParagraph
          text={data.relevance.data.feedback}
        ></AnalysisParagraph>
        <div className="flex w-full flex-row items-center justify-center">
          <div className="mb-2 h-2 w-full rounded-full bg-slate-300 dark:bg-gray-500">
            <div
              className="h-full rounded-full bg-green-400/80 text-center text-xs text-white"
              style={{ width: data.relevance.data.score + "%" }}
            ></div>
          </div>
          <Like
            className="pb-2 pl-3"
            boostId={data.boostId}
            feedbackId={data.relevance.feedbackId}
            isLiked={data.relevance.isLiked}
          />
        </div>
      </SubCard>
      <SubCard isFull={data.achievements.isFull}>
        <AnalysisSubTitle title="Achievements"></AnalysisSubTitle>
        <AnalysisParagraph
          text={data.achievements.data.feedback}
        ></AnalysisParagraph>
        <div className="flex w-full flex-row items-center justify-center">
          <div className="mb-2 h-2 w-full rounded-full bg-slate-300 dark:bg-gray-500">
            <div
              className="h-full rounded-full bg-yellow-400/80 text-center text-xs text-white"
              style={{ width: data.achievements.data.score + "%" }}
            ></div>
          </div>
          <Like
            className="pb-2 pl-3"
            boostId={data.boostId}
            feedbackId={data.achievements.feedbackId}
            isLiked={data.achievements.isLiked}
          />
        </div>
      </SubCard>
      <SubCard last isFull={data.keywords.isFull}>
        <AnalysisSubTitle title="Keywords"></AnalysisSubTitle>
        <AnalysisParagraph
          text={data.keywords.data.feedback}
        ></AnalysisParagraph>
        <div className="flex w-full flex-row items-center justify-center">
          <div className="mb-2 h-2 w-full rounded-full bg-slate-300 dark:bg-gray-500">
            <div
              className="h-full rounded-full bg-fuchsia-400/80 text-center text-xs text-white"
              style={{ width: data.keywords.data.score + "%" }}
            ></div>
          </div>
          <Like
            className="pb-2 pl-3"
            boostId={data.boostId}
            feedbackId={data.keywords.feedbackId}
            isLiked={data.keywords.isLiked}
          />
        </div>
      </SubCard>
    </Card>
  );
};

export default FeedbackCard;
