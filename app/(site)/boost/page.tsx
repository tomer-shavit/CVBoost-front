"use client";
import ApiLoader from "@/components/Loader";
import { UploadSection } from "@/components/Upload";
import useFetchWithFile from "@/hooks/useFetchWithFile";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveBoostResponseToDB } from "@/actions/boostActions";
import usePageView from "@/hooks/usePageView";
import { PageNames } from "@/types/monitoring/pageNames";

const BoostPage = () => {
  const { data: session } = useSession({ required: true });
  usePageView(PageNames.BOOST, {}, session?.user?.id);
  const [file, setFile] = useState<File | undefined>();
  const [boostId, setBoostId] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingError, setProcessingError] = useState<string | null>(null);

  // Only fetch if we have both file and userId
  const { data, error, isLoading } = useFetchWithFile(
    file,
    "resume",
    session?.user?.id,
  );

  const router = useRouter();

  useEffect(() => {
    const handleDataFromFunction = async () => {
      if (error) {
        console.error("Error processing resume:", error);
        router.push("/error");
        return;
      }

      if (!data) {
        return; // No data yet, nothing to do
      }

      if (!session?.user?.id) {
        console.error("Missing user ID when trying to save boost response");
        setProcessingError("User authentication error. Please try again.");
        return;
      }

      try {
        setIsProcessing(true);
        const boostIdFromAction = await saveBoostResponseToDB(
          data,
          session.user.id,
        );
        setBoostId(boostIdFromAction.boostId);
      } catch (err) {
        console.error("Error saving boost response:", err);
        setProcessingError(
          "Failed to save your resume analysis. Please try again.",
        );
      } finally {
        setIsProcessing(false);
      }
    };

    handleDataFromFunction();
  }, [data, error, router, session?.user?.id]);

  useEffect(() => {
    if (boostId) {
      router.push(`/boost/${boostId}`);
    }
  }, [boostId, router]);

  const handleRetry = () => {
    setProcessingError(null);
    setFile(undefined);
  };

  return (
    <>
      {file ? (
        !boostId ? (
          processingError ? (
            <div className="mx-auto mt-8 max-w-xl rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/30">
              <p className="mb-4 text-red-700 dark:text-red-300">
                {processingError}
              </p>
              <button
                onClick={handleRetry}
                className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <ApiLoader />
          )
        ) : null
      ) : (
        <UploadSection setFile={setFile} />
      )}
    </>
  );
};

export default BoostPage;
