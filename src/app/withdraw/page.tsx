"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import WithdrawPage from "@/pages/WithdrawPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <WithdrawPage />
    </ProtectedRoute>
  );
}
