"use client";

import { useContext, useEffect } from "react";
import { motion } from "motion/react";
import { ToastContext } from "@/context/ToastContext";

type ToastType = "success" | "error" | "warning" | "info";

const toastConfig = {
  success: {
    bg: "bg-green-500",
    text: "text-white",
    icon: "✓",
  },
  error: {
    bg: "bg-red-500",
    text: "text-white",
    icon: "✕",
  },
  warning: {
    bg: "bg-yellow-500",
    text: "text-white",
    icon: "⚠",
  },
  info: {
    bg: "bg-blue-500",
    text: "text-white",
    icon: "ℹ",
  },
};

export default function Toast() {
  const { showToast, setShowToast } = useContext(ToastContext);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowToast({ status: false, type: "", message: "" });
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [showToast.status, setShowToast]);

  if (!showToast.status) return null;

  const config = toastConfig[showToast.type as ToastType] || toastConfig.info;

  return (
    <motion.div
      key="toast"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -20 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed z-50 left-10 bottom-4 min-w-[200px] py-3 px-4 rounded-lg shadow-lg ${config.bg} ${config.text}`}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg font-semibold">{config.icon}</span>
        <span>{showToast.message}</span>
      </div>
    </motion.div>
  );
}
