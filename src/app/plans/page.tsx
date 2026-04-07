"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import MiningPlans from "@/pages/MiningPlans";

export default function Page() {
  return (
    <ProtectedRoute>
      <MiningPlans />
    </ProtectedRoute>
  );
}
