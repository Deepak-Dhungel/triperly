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
  // const [isLoggedIn, setIsLoggedIn] = useState<User | undefined>(undefined);
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

  useEffect(() => {
    console.log("initializing", initializing);
  }, [initializing]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log("user is signed in", user);
    } else {
      console.log("no user is signed in");
    }
  }, [user]);

  const loginWithGoogle = useCallback(async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        setUser(result.user);
      }

      const idToken = await user?.getIdToken();

      if (!idToken) {
        console.error("No ID token found for user");
        return;
      }
      console.log("ID Token:", idToken);
      try {
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
        router.push("/dashboard");
      } catch (error) {
        console.error("Error creating session:", error);
      }
    } catch (error) {
      console.error("sign in error", error);
    } finally {
      setShowToast({
        status: true,
        type: "success",
        message: "Signed in successfully",
      });
    }
  }, []);

  const logoutUser = useCallback(async (): Promise<void> => {
    try {
      await signOut(auth);
      setSignoutDialog(false);
      router.push("/");
    } catch (error) {
      console.error("error while signing out", error);
    } finally {
      setShowToast({
        status: true,
        type: "success",
        message: "Signed out successfully",
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
      // isLoggedIn,
      // setIsLoggedIn,
    }),
    [
      user,
      initializing,
      loginWithGoogle,
      logoutUser,
      setUser,
      signoutDialog,
      setSignoutDialog,
      // isLoggedIn,
      // setIsLoggedIn,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
