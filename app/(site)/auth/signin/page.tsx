"use client";
import Signin from "@/components/Auth/Signin";
import usePageView from "@/hooks/usePageView";
import { PageNames } from "@/types/monitoring/pageNames";

const SigninPage = () => {
  usePageView(PageNames.SIGN_IN);
  return (
    <>
      <Signin />
    </>
  );
};

export default SigninPage;
