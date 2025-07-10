"use client";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/service/firebase.config";

type AuthContextType = {
  isLoggedIn: User | undefined;
  setIsLoggedIn: Dispatch<SetStateAction<User | undefined>>;
  loginWithGoogle: () => void;
  logoutUser: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<User | undefined>();

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        // setOpenLoginModal(false);
        console.log("res", result);
      })
      .catch((error) => {
        console.log("sign in error", error);
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(user);
    } else {
      //   console.log("user is not logged in");
      setIsLoggedIn(undefined);
    }
  });

  async function logoutUser() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("error while signing out", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, loginWithGoogle, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
