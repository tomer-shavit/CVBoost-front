import React from "react";
import Link from "next/link";
import { FaLock } from "react-icons/fa";

const SubCard: React.FC<{
  children: React.ReactNode;
  last?: boolean;
  className?: string;
  isFull?: boolean;
}> = ({ children, last = false, className, isFull = false }) => {
  return (
    <div
      className={`relative block rounded-lg ${className} ${
        last ? "" : "mb-8"
      } bg-gray-100 p-4 shadow-md dark:bg-black`}
    >
      {children}
      {!isFull && (
        <Link href="/checkout">
          <div className="absolute bottom-0 left-0 z-10 flex h-3/4 w-full flex-col items-center justify-center rounded-bl-lg rounded-br-lg bg-gradient-to-t from-slate-200 from-40% via-45% to-transparent px-4 dark:from-slate-950">
            <FaLock className="mt-13 text-2xl" />
            <span className="text-center font-semibold">
              Upgrade your plan for the full feedback.
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SubCard;
