"use client";
import usePageView from "@/hooks/usePageView";
import { MixpanelFront } from "@/services/mixpanelFront";
import { PageNames } from "@/types/monitoring/pageNames";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const ErroPage = () => {
  const { data: session } = useSession();
  usePageView(PageNames.ERROR_404, {}, session?.user?.id);
  return (
    <section className="flex items-center overflow-hidden pb-25 pt-45 lg:pb-32.5 lg:pt-50 xl:pb-37.5 xl:pt-55">
      <div className="animate_top mx-auto max-w-[518px] px-6 text-center">
        <Image
          src="/images/shape/404.svg"
          alt="404"
          className="mx-auto mb-7.5"
          width={400}
          height={400}
        />

        <h2 className="mb-5 text-2xl font-semibold text-black dark:text-white md:text-4xl">
          This Page Does Not Exist
        </h2>
        <p className="mb-7.5">
          The page you were looking for appears to have been moved, deleted or
          does not exist.
        </p>
        <div className="flex w-full flex-col items-center justify-center sm:flex-row">
          <div
            className="bg-tra mb-4 inline-flex cursor-pointer items-center justify-center rounded-full border-4 border-black px-6 py-3 font-bold text-black duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:text-black dark:hover:bg-blackho sm:mb-0 sm:mr-4"
            onClick={() => {
              MixpanelFront.getInstance().track("PageView::BugReport");
            }}
          >
            <Link
              href={
                process.env.NEXT_PUBLIC_BUG_FORM
                  ? process.env.NEXT_PUBLIC_BUG_FORM
                  : "/"
              }
              target="_blank"
            >
              Report A Bug 🐞
            </Link>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
          >
            Return to Home
            <svg
              className="fill-white"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ErroPage;
