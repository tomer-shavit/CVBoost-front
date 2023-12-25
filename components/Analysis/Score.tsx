"use client";
import { FEEDBACKS_AMOUNT } from "@/constants/analysis";
import { BoostResponse } from "@/types/apiCalls";
import React, { useEffect, useState } from "react";

export const Score: React.FC<{ boost: BoostResponse }> = ({ boost }) => {
  const [score, setScore] = useState<number>();

  useEffect(() => {
    const totalScore =
      (boost.clarity.data.score +
        boost.relevance.data.score +
        boost.achievements.data.score +
        boost.keywords.data.score) /
      FEEDBACKS_AMOUNT;
    setScore(totalScore);
  }, [boost]);

  return (
    <div className="flex flex-col lg:flex-row">
      <h5 className="text-3xl font-extrabold leading-tight text-blackho dark:text-white lg:pr-2">
        Total Score:
      </h5>
      <h5 className="mb-4 text-3xl font-extrabold leading-tight  text-blackho dark:text-white">
        <span className="text-green-400">{score}</span> / 100
      </h5>
    </div>
  );
};
