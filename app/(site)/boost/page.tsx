"use client";
import ApiLoader from "@/components/Loader";
import { UploadSection } from "@/components/Upload";
import useFetchWithFile from "@/hooks/useFetchWithFile";
import { useSession } from "next-auth/react";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { saveBoostResponseToDB } from "@/actions/boostActions";
import usePageView from "@/hooks/usePageView";
import { PageNames } from "@/types/monitoring/pageNames";

const BoostPage = () => {
  const { data: session } = useSession({ required: true });
  usePageView(PageNames.BOOST, {}, session?.user?.id);
  const [file, setFile] = useState<File | undefined>();
  const [boostId, setBoostId] = useState<number | null>(null);
  const { data, error } = useFetchWithFile(file, "resume", session?.user?.id);
  const router = useRouter();

  useEffect(() => {
    const handleDataFromFucntion = async () => {
      if (error) {
        router.push("/error");
      } else if (data) {
        const boostIdFromAction = await saveBoostResponseToDB(
          data,
          session?.user?.id as string,
        );
        setBoostId(boostIdFromAction.boostId);
      }
    };
    handleDataFromFucntion();
  }, [data, error, router]);

  useEffect(() => {
    if (boostId) {
      router.push(`/boost/${boostId}`);
    }
  }, [boostId]);

  return (
    <>
      {file ? (
        !boostId ? (
          <ApiLoader />
        ) : null
      ) : (
        <UploadSection setFile={setFile} />
      )}
    </>
  );
};

export default BoostPage;
