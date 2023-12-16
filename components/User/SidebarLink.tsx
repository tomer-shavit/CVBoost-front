"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

const SidebarLink = () => {
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
        <p
          onClick={() => signOut({ callbackUrl: "/" })}
          className={`flex w-full cursor-pointer rounded-sm px-3 py-2 text-base text-red-500`}
        >
          Delete Account
        </p>
      </li>
    </>
  );
};

export default SidebarLink;
