"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
} from "react";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/service/firebase.config";
import { ToastContext } from "./ToastContext";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  initializing: boolean;
  // isLoggedIn: User | undefined;
  // setIsLoggedIn: Dispatch<SetStateAction<User | undefined>>;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
  signoutDialog: boolean;
  setSignoutDialog: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return ctx;
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [signoutDialog, setSignoutDialog] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const { setShowToast } = React.useContext(ToastContext);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });

    return () => {
      unsub();
    };
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user?.getIdToken();

      if (!idToken) {
        console.error("No ID token found for user");
        return;
      }

      // create session on the server
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        console.error("Failed to create session");
        return;
      }

      // set user to a state
      setUser(result.user);

      // show success toast
      setShowToast({
        status: true,
        type: "success",
        message: "Signed in successfully",
      });

      // reduirect to dashboard after successful login
      router.push("/dashboard");
    } catch (error) {
      console.error("sign in error", error);

      // show error toast on sign in failure
      setShowToast({
        status: true,
        type: "error",
        message: "Error signing in. Please try again.",
      });
    }
  }, []);

  const logoutUser = useCallback(async (): Promise<void> => {
    try {
      // logout from firebase
      await signOut(auth);

      // clear session cookie on the server
      const res = await fetch("/api/auth/session", {
        method: "DELETE",
      });
      if (!res.ok) {
        console.error("Failed to clear session");
      }

      // clear user state
      setUser(null);

      // close the signout dialog if open
      setSignoutDialog(false);

      // show signout success toast
      setShowToast({
        status: true,
        type: "success",
        message: "Signed out successfully",
      });

      //redurect to home page
      router.push("/");
    } catch (error) {
      console.error("error while signing out", error);

      // show error toast on sign out failure
      setShowToast({
        status: true,
        type: "error",
        message: "Error signing out. Please try again.",
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      initializing,
      loginWithGoogle,
      logoutUser,
      setUser,
      signoutDialog,
      setSignoutDialog,
    }),
    [
      user,
      initializing,
      loginWithGoogle,
      logoutUser,
      setUser,
      signoutDialog,
      setSignoutDialog,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
