"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ApiLoader from "@/components/Loader";
import { UploadSection } from "@/components/Upload";
import { useSession } from "next-auth/react";

const BoostPage = () => {
  const { data: session, status } = useSession({
    required: true,
  });
  return (
    <>
      <Header />
      <UploadSection />
      {/* <ApiLoader></ApiLoader> */}
    </>
  );
};

export default BoostPage;
