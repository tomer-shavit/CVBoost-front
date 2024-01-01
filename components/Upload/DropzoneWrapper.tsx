"use client";
import React, { ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdUploadFile } from "react-icons/md";
import { motion as m } from "framer-motion";
import { useSession } from "next-auth/react";
import { isEligibleForBoost } from "@/actions/boostActions";
import { useRouter } from "next/navigation";

const DropzoneWrapper: React.FC<{
  children: ReactNode;
  className?: string;
  setFile: (file: File) => void;
}> = ({ children, setFile, className }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const isEligible = await isEligibleForBoost(session?.user?.id);
      if (isEligible) {
        setFile(acceptedFiles[0]);
      } else {
        router.push("/checkout");
      }
    },
    [setFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <m.div
      initial={{ opacity: 0, y: "15%" }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      exit={{ opacity: 0, y: "15%" }}
      className={className}
    >
      <div
        {...getRootProps()}
        className="relative h-full min-h-[380px] w-full border-none"
      >
        <input {...getInputProps()} />
        {children}
        {isDragActive && (
          <m.div className="absolute inset-0 m-8 flex items-center justify-center rounded-md border-dashed border-gray-400 bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-20">
            <div className="text-center">
              <MdUploadFile className="text-9xl  text-green-500"></MdUploadFile>
            </div>
          </m.div>
        )}
      </div>
    </m.div>
  );
};

export default DropzoneWrapper;
