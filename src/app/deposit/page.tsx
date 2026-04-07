"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import DepositPage from "@/pages/DepositPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <DepositPage />
    </ProtectedRoute>
  );
}
