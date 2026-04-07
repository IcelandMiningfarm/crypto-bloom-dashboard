"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import TransactionHistory from "@/pages/TransactionHistory";

export default function Page() {
  return (
    <ProtectedRoute>
      <TransactionHistory />
    </ProtectedRoute>
  );
}
