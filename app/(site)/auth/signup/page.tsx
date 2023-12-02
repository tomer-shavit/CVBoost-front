import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup Page - CVBoost Login",
  description: "This is Signup page for CVBoost",
  // other metadata
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
