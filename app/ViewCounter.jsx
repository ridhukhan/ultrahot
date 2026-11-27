"use client";
import { useEffect } from "react";

export default function ViewCounter() {
  useEffect(() => {
    fetch("/api/views", { method: "POST" }).catch((err) =>
      console.error("View count error:", err)
    );
  }, []);

  return null;
}