"use client";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { setFeedbackLiked } from "@/actions/feedbackActions";
import { useOptimistic } from "@/hooks/useOptimistic";

export const Like: React.FC<{
  boostId: string;
  feedbackId: number;
  isLiked: boolean;
  className?: string;
}> = ({ boostId, feedbackId, isLiked, className }) => {
  const [optimisticLike, setOptimisticLike] = useOptimistic(
    isLiked,
    (isLiked, _) => !isLiked,
  );

  return (
    <div
      className={`noSelect cursor-pointer ${className}`}
      onClick={async () => {
        setOptimisticLike(!optimisticLike);
        await setFeedbackLiked(Number(boostId), feedbackId, !isLiked);
      }}
    >
      {optimisticLike ? (
        <FaHeart className="text-xl text-red-500" />
      ) : (
        <FaRegHeart className="bottom-4 right-4 text-xl text-slate-400" />
      )}
    </div>
  );
};
