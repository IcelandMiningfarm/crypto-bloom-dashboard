"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import SettingsPage from "@/pages/SettingsPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  );
}
