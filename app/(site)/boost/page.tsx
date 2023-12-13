"use client";
import Header from "@/components/Header";
import ApiLoader from "@/components/Loader";
import { UploadSection } from "@/components/Upload";
import useFetchWithFile from "@/hooks/useFetchWithFile";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBoostData } from "@/app/context/BoostContext";

const BoostPage = () => {
  const { data: session, status } = useSession({ required: true });
  const { setBoostData } = useBoostData();
  const [file, setFile] = useState<File | undefined>();
  const { data, isLoading, error } = useFetchWithFile(
    process.env.NEXT_PUBLIC_BOOST_FUNC_API as string,
    file,
    "resume",
    session?.user?.id,
  );
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push("/error");
    } else if (data) {
      setBoostData(data);
      router.push(`/boost/${data.boost_id}`); // Assuming data has a boost_id field
    }
  }, [data, error, router]);

  return (
    <>
      <Header />
      {file ? (
        isLoading ? (
          <ApiLoader />
        ) : null
      ) : (
        <UploadSection setFile={setFile} />
      )}
    </>
  );
};

export default BoostPage;
