"use client";

import React, { useContext, useEffect } from "react";
import Image from "next/image";
import GoogleIcon from "@/public/google-icon.svg";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import PrimaryButton from "@/components/ui-elements/PrimaryButton";

function LoginPage() {
  const router = useRouter();
  const { loginWithGoogle, isLoggedIn } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get("redirect") || "/";

  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn, router]);

  const handleGoogleLogin = async () => {
    try {
      console.log("Login with Google");
      loginWithGoogle();
      if (isLoggedIn) {
        router.push(redirectPath);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="h-dvh w-dvw flex justify-center items-center relative ">
      <div
        className="hidden lg:block absolute left-0 bottom-0 w-[30%] max-h-full h-[500px] bg-contain bg-no-repeat opacity-[0.30] pointer-events-none"
        style={{
          backgroundImage: "url('/hero-bg-left.svg')",
          backgroundPosition: "left bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />

      <div
        className="hidden lg:block absolute right-0 bottom-0 w-[30%] max-h-full h-[500px] bg-contain bg-no-repeat opacity-[0.30] pointer-events-none"
        style={{
          backgroundImage: "url('/hero-bg-right.svg')",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
      <div className="w-[80%] md:w-[500px] min-h-[300px] flex flex-col justify-between bg-[--bg-high] items-center py-10 rounded-lg ">
        <div className="flex flex-col gap-2 items-center">
          <span className="text-3xl font-semibold">Sign in</span>
          <span className="text-lg font-normal">
            Log in to <span className="text-[--accent]"> TripErly</span> using
            your credentials
          </span>
        </div>

        <div className="flex flex-col px-10 ">
          <input
            type="text"
            className="mt-4 py-2 px-6 rounded-lg focus:outline-[--accent-light] placeholder:text-gray-300 placeholder:text-sm placeholder:font-thin"
            placeholder="Enter your email"
          />
          <input
            type="password"
            className="mt-4 py-2 px-6 rounded-lg focus:outline-[--accent-light] placeholder:text-gray-300 placeholder:text-sm placeholder:font-thin"
            placeholder="Enter your password"
          />
          <div className="my-6 ">
            <PrimaryButton buttonText="Sign In" />
          </div>
        </div>

        <span>OR</span>

        <div
          className="mt-4 h-12 rounded-lg flex gap-3 items-center justify-between px-6 bg-orange-200 hover:bg-orange-300 cursor-pointer "
          onClick={handleGoogleLogin}
        >
          <Image
            src={GoogleIcon}
            alt="google icon"
            width={20}
            height={20}
            className="w-[20px] h-[20px]"
          />
          <span className="text-md font-normal">Sign in With Google</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
