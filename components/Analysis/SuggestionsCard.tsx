"use client";
import { BoostResponse } from "../../types/apiCalls";
import OldLine from "./OldLine";
import NewLine from "./NewLine";
import { HiOutlineSparkles } from "react-icons/hi";
import SubCard from "./SubCard";
import Card from "./Card";

const SuggestionsCard: React.FC<{ data: BoostResponse }> = ({ data }) => {
  return (
    <Card>
      <h5 className="mb-8 flex items-center text-3xl font-extrabold leading-tight text-blackho dark:text-white">
        <span className="mr-2 mt-1 inline-block">
          <HiOutlineSparkles />{" "}
        </span>
        Suggestions:
      </h5>
      {data.edited_lines.map((line, index) => {
        return (
          <SubCard last={index === data.edited_lines.length - 1} key={index}>
            <OldLine text={line.old_line}></OldLine>
            <NewLine text={line.new_line}></NewLine>
          </SubCard>
        );
      })}
    </Card>
  );
};

export default SuggestionsCard;
