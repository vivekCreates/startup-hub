// components/Spinner.tsx
import React from "react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="spinner w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
