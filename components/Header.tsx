"use client";

import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import ava from "@/public/3.png";
import Image from "next/image";
import PrimaryButton from "./ui-elements/PrimaryButton";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const { isLoggedIn, setSignoutDialog, signoutDialog } =
    useContext(AuthContext);
  const [openMenuDialog, setOpenMenuDialog] = useState(false);
  const menuDialogRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const handleMenuDialog = () => {
    setOpenMenuDialog(!openMenuDialog);
  };

  //
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

  function displayFirstName(fullName: string) {
    const firstName = fullName.split(" ")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }

  return (
    <div className="flex justify-between items-center py-4 px-4 md:px-10 z-[8] fixed top-0 left-0 right-0 bg-[--bg-high] md:bg-transparent">
      <Link href="/" className="font-bold text-2xl">
        TripErly
      </Link>

      {isLoggedIn ? (
        <div className="flex items-center gap-10 relative">
          <Link
            href="/dashboard"
            className="cursor-pointer flex items-center gap-1 hover:text-[--accent]"
          >
            Dashboard
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
              className="absolute md:right-0 top-14 bg-background border-[1px] z-10 w-[200px] p-2 rounded-lg drop-shadow-lg"
            >
              <ul className="space-y-4">
                <li className="p-2">
                  Hi,{" "}
                  {isLoggedIn?.displayName &&
                    displayFirstName(isLoggedIn.displayName)}
                  !
                </li>

                <li
                  className="p-2 cursor-pointer text-gray-500 rounded-lg hover:text-gray-800 hover:bg-orange-100"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Dashboard
                </li>

                <li
                  className="p-2 cursor-pointer text-gray-500 rounded-lg hover:text-gray-800 hover:bg-orange-100"
                  onClick={() => {
                    setSignoutDialog(true);
                  }}
                >
                  Log Out
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login">
          <PrimaryButton buttonText="Sign in" />
        </Link>
      )}

      {signoutDialog && <SignoutDialog />}
    </div>
  );
}

export default Header;

export function SignoutDialog() {
  const { logoutUser, setSignoutDialog } = useContext(AuthContext);
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
        <div className="bg-[--bg-high] rounded-lg p-6 w-80">
          <h2 className="text-xl font-semibold mb-4">Confirm Sign Out</h2>
          <p className="mb-6">Are you sure you want to sign out?</p>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={() => {
                setSignoutDialog(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-[--accent] text-white rounded-lg hover:bg-orange-600"
              onClick={logoutUser}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
