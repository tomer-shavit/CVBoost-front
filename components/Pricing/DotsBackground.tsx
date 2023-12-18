"use client";
import Image from "next/image";
export const DotsBackground = () => {
  return (
    <div className="absolute -bottom-15 -z-1 h-full w-full">
      <Image
        fill
        src="./images/shape/shape-dotted-light.svg"
        alt="Dotted"
        className="dark:hidden"
      />
    </div>
  );
};
