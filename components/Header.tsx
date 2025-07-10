"use client";
import Link from "next/link";
import GradientBorderBtn from "./ui-elements/GradientBorderBtn";
import GradientText from "./ui-elements/GradientText";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import ava from "@/public/3.png";
import Image from "next/image";

function Header() {
  const pathname = usePathname();
  const hideHeader = pathname === "/login";
  const { isLoggedIn } = useContext(AuthContext);
  const [openMenuDialog, setOpenMenuDialog] = useState(false);
  const menuDialogRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const handleMenuDialog = () => {
    setOpenMenuDialog(!openMenuDialog);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      if (
        menuDialogRef.current &&
        !menuDialogRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setOpenMenuDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (hideHeader) return;

  return (
    <div className="flex justify-between items-center py-4 px-4 md:px-10 z-[8]">
      <Link href="/" className="font-bold text-2xl">
        <GradientText text="TripErly" />
      </Link>

      {isLoggedIn ? (
        <div className="flex items-center gap-10 relative">
          <Link
            href="/dashboard"
            className="border-[1px] border-gray-400 py-1 px-4 rounded-full cursor-pointer flex items-center"
          >
            My TripErly
          </Link>
          <div
            className="cursor-pointer"
            onClick={handleMenuDialog}
            ref={avatarRef}
          >
            <Image
              src={isLoggedIn.photoURL || ava}
              alt="avatar"
              height={40}
              width={40}
              className="rounded-full  "
            />
          </div>

          {openMenuDialog && (
            <div
              ref={menuDialogRef}
              className="absolute md:right-0 top-14 bg-background border-[1px] z-10 w-[200px] p-4 rounded-lg drop-shadow-lg"
            >
              <ul className="">
                <li className="cursor-pointer text-gray-500 hover:text-gray-800">
                  Sign out
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login" className="h-10 w-[130px]">
          <GradientBorderBtn text="Sign in" />
        </Link>
      )}
    </div>
  );
}

export default Header;
