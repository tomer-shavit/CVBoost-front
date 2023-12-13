import FeedbackCard from "./FeedbackCard";
import { motion as m } from "framer-motion";
import { GptApiResponse } from "../../types/apiCalls";
import SummaryView from "./SummaryCard";
import SuggestionsCard from "./SuggestionsCard";

const Analysis: React.FC<{ data: GptApiResponse }> = ({ data }) => {
  return (
    <div className="mt-24 grid grid-cols-1 gap-y-10 pl-8 pr-8 pt-4 md:h-[91vh] md:grid-cols-2 md:grid-rows-6 md:gap-x-12 md:gap-y-8">
      <m.div
        initial={{ opacity: 0, y: "5%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        exit={{ opacity: 0, y: "5%" }}
        className="overflowy-y-hidden  col-start-1 rounded-lg md:row-start-1 md:row-end-3"
      >
        <SummaryView data={data}></SummaryView>
      </m.div>
      <m.div
        initial={{ opacity: 0, y: "5%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        exit={{ opacity: 0, y: "5%" }}
        className="col-start-1 overflow-y-auto rounded-lg md:col-start-2 md:row-start-1 md:row-end-7"
      >
        <FeedbackCard data={data}></FeedbackCard>
      </m.div>
      <m.div
        initial={{ opacity: 0, y: "5%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
        exit={{ opacity: 0, y: "5%" }}
        className="col-start-1 row-start-3 row-end-7 overflow-y-auto rounded-lg"
      >
        <SuggestionsCard data={data}></SuggestionsCard>
      </m.div>
      <div className="col-start-1 col-end-3 mb-16 justify-center text-center text-lg md:mb-6">
        <p>We want to hear your feedback! </p>
        <a
          href={process.env.NEXT_PUBLIC_FEEDBACK_FORM}
          target="_blank"
          className="text-lg font-bold text-green-400"
        >
          Click Here
        </a>
      </div>
    </div>
  );
};

export default Analysis;
