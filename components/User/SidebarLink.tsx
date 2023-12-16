"use client";
import { deleteAccount } from "@/actions/feedbackActions";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";

const SidebarLink = () => {
  const { data: session } = useSession();
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <li className="block">
        <p
          className={`flex w-full rounded-sm bg-stroke px-3 py-2 text-base text-black dark:bg-blackho dark:text-white`}
        >
          My Boosts
        </p>
        <Link
          href={`/boost`}
          className={`flex w-full rounded-sm px-3 py-2 text-base text-black dark:text-white `}
        >
          Boost New CV
        </Link>
        <p
          onClick={() => signOut({ callbackUrl: "/" })}
          className={`flex w-full cursor-pointer rounded-sm px-3 py-2 text-base text-black dark:text-white `}
        >
          Sign Out
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className={`flex w-full cursor-pointer rounded-sm px-3 py-2 text-base text-red-500`}
        >
          Delete Account
        </button>
      </li>{" "}
      {session?.user?.id && (
        <DeleteAccountModal
          userId={session?.user?.id}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={deleteAccount}
        />
      )}
    </>
  );
};

export default SidebarLink;
