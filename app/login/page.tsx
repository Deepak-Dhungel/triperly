"use client";

import React, { useContext, useEffect } from "react";
import img1 from "@/public/3.png";
import img2 from "@/public/4.jpeg";
import Image from "next/image";
import Link from "next/link";
import GradientText from "@/components/ui-elements/GradientText";
import GoogleIcon from "@/public/google-icon.svg";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

const images = [img1, img2, img1, img2, img1];

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
    <div className="w-full h-screen flex px-4 md:px-10 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-[#dcf2d4] to-background to-[80%]">
      <div className="w-full md:w-2/3 pt-10 flex flex-col">
        <Link href="/" className="font-bold text-2xl flex">
          <GradientText text="TripErly" />
        </Link>

        <div
          className=" mt-20 md:w-[60%] flex flex-col"
          onClick={handleGoogleLogin}
        >
          <span className="text-2xl font-semibold">Sign in</span>
          <span className="text-lg font-normal text-gray-600">
            Log in to TripErly using your credentials
          </span>

          <div className="mt-20 h-12 w-80 border-2 border-gray-100 hover:border-[#e6efe3] rounded-full flex items-center justify-between px-6 bg-[#e6efe3] hover:bg-[#f0f5ee] cursor-pointer hover:shadow-md">
            <div className="flex gap-4">
              <Image
                src={GoogleIcon}
                alt="google icon"
                width={20}
                height={20}
                className="w-[20px] h-[20px]"
              />
              <span className="text-md font-semibold">Login With Google</span>
            </div>
            <HiOutlineArrowRight />
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/3 relative">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent z-10" />
        <div className="w-full h-full flex gap-8 overflow-hidden relative">
          {[
            "animate-marquee-up",
            "animate-marquee-down",
            "animate-marquee-up",
          ].map((animation, index) => (
            <div key={index} className="relative w-full h-1/2">
              <div className={`absolute flex ${animation}`}>
                <div className="flex flex-col items-center justify-center shrink-0">
                  {[...images, ...images].map((item, idx) => (
                    <div key={idx} className="w-36 h-48 my-2 relative">
                      <Image
                        src={item}
                        fill
                        alt="carousel"
                        className="rounded-lg object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
