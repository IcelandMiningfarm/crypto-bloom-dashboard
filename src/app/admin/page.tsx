"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AdminPage from "@/pages/AdminPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  );
}
