"use client";

import { useEffect } from "react";
import { auth } from "../utils/firebase";

export default function ClientWrapper({ children }) {
  useEffect(() => {
    auth; // Ensure Firebase auth is initialized
  }, []);

  return children;
}
