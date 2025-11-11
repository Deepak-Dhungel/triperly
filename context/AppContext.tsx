"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type AppContextType = {
  showToast: showToastType;
  setShowToast: Dispatch<SetStateAction<showToastType>>;
};

type showToastType = {
  status: boolean;
  type: string;
  message: string;
};

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showToast, setShowToast] = useState<showToastType>({
    status: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    console.log(showToast);
  }, [showToast]);

  return (
    <AppContext.Provider value={{ showToast, setShowToast }}>
      {children}
    </AppContext.Provider>
  );
};
