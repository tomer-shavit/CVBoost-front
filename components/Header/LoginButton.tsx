"use client";
import { useSession } from "next-auth/react";
import Link from "next/link"; // or the appropriate import based on your project

const LoginButton = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      {session ? (
        <Link href="/user">
          <p className="cursor-pointer font-medium text-strokedark hover:text-primary dark:text-zumthor">
            Hi {session?.user?.name}
          </p>
        </Link>
      ) : (
        <div className="flex flex-row items-center justify-between">
          <Link
            href="/auth/signin"
            className="font-mediumtext-strokedark mr-4 text-regular text-strokedark hover:text-primary dark:text-zumthor"
          >
            Login
          </Link>
          <Link
            href="/boost"
            className="flex items-center justify-center rounded-full bg-primary px-7.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
          >
            Let's Start 🔥
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
