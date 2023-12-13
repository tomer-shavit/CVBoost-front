"use client";
import Analysis from "@/components/Analysis";
import Header from "@/components/Header";
import { GptApiResponse } from "@/types/apiCalls";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BoostIdPage = () => {
  const router = useRouter();
  const [data, setData] = useState<GptApiResponse>();

  useEffect(() => {
    const storedData = sessionStorage.getItem("boostData");
    if (!storedData) {
      router.push("/boost");
    } else {
      setData(JSON.parse(storedData));
    }
    // sessionStorage.removeItem("boostData");
  }, []);

  return (
    <>
      <Header />
      {data ? <Analysis data={data}></Analysis> : null}
    </>
  );
};

export default BoostIdPage;
