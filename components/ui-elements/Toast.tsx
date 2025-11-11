"use client";

import { useContext, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { AppContext } from "@/context/AppContext";

export default function Toast() {
  const { showToast, setShowToast } = useContext(AppContext);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setShowToast({ status: false, type: "", message: "" });
    }, 2000);

    return () => {
      clearTimeout(t);
    };
  }, [showToast.status, setShowToast]);

  if (!showToast.status) return null;

  //   const bgClass = useMemo(() => {
  //     if (showToast.type === "success") return "bg-green-200";
  //     if (showToast.type === "error") return "bg-red-200";
  //     return "bg-blue-200";
  //   }, [showToast.type]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -20 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed z-50 left-10 bottom-4 min-w-[200px] ${
        showToast.type === "success"
          ? "bg-green-200"
          : showToast.type === "error"
          ? "bg-red-200"
          : "bg-blue-200"
      } py-2 px-4 rounded-md shadow-md text-center`}
    >
      {showToast.message}
    </motion.div>
  );
}
