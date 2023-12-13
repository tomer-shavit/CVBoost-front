"use client";
import { useBoostData } from "@/app/context/BoostContext";
import Analysis from "@/components/Analysis";
import Header from "@/components/Header";

const BoostIdPage = () => {
  const { boostData } = useBoostData();

  return (
    <>
      <Header />
      <Analysis data={boostData}></Analysis>
    </>
  );
};

export default BoostIdPage;
