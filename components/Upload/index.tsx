"use client";
import { motion as m } from "framer-motion";
import Input from "./Input";
import DropzoneWrapper from "./DropzoneWrapper";
import { useState } from "react";
import SectionHeader from "../Common/SectionHeader";

export const UploadSection = () => {
  const [file, setFile] = useState<File | undefined>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  return (
    <section className="mb-55 mt-10 w-full overflow-hidden pb-10 pt-35 md:pt-40 xl:pb-12 xl:pt-46">
      <DropzoneWrapper className="" setFile={setFile}>
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "",
              subtitle: "You are Almost There!",
              description:
                "Simply upload your resume by clicking the button below and we will take care of the rest.",
            }}
          />
          <m.div
            initial={{ opacity: 0, y: "15%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.35 }}
            exit={{ opacity: 0, y: "15%" }}
          >
            <p className="mb-8 pl-4 pr-4 text-center text-black md:mb-10 md:mt-4 lg:text-lg "></p>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: "15%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.45 }}
            exit={{ opacity: 0, y: "15%" }}
            className="text-center md:mt-2"
          >
            <Input
              type="file"
              text="Upload Resume"
              onChange={handleFileChange}
              className="p-2 pb-6"
            ></Input>
            <p className="dark:text-neutral-400">PDF format, English Only.</p>
          </m.div>
        </div>
      </DropzoneWrapper>
    </section>
  );
};
