"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";

type ToastContextType = {
  showToast: showToastType;
  setShowToast: Dispatch<SetStateAction<showToastType>>;
};

type showToastType = {
  status: boolean;
  type: string;
  message: string;
};

export const ToastContext = createContext({} as ToastContextType);

export const ToastContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showToast, setShowToast] = useState<showToastType>({
    status: false,
    type: "",
    message: "",
  });

  return (
    <ToastContext.Provider value={{ showToast, setShowToast }}>
      {children}
    </ToastContext.Provider>
  );
};
