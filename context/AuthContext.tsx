"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/service/firebase.config";
import { AppContext } from "./AppContext";

type AuthContextType = {
  isLoggedIn: User | undefined;
  setIsLoggedIn: Dispatch<SetStateAction<User | undefined>>;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
  signoutDialog: boolean;
  setSignoutDialog: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<User | undefined>(undefined);
  const [signoutDialog, setSignoutDialog] = useState(false);

  const { setShowToast } = React.useContext(AppContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user ?? undefined);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        setIsLoggedIn(result.user);
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loginWithGoogle,
        logoutUser,
        signoutDialog,
        setSignoutDialog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
