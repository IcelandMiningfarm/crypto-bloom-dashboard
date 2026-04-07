"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import ReferralPage from "@/pages/ReferralPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <ReferralPage />
    </ProtectedRoute>
  );
}
