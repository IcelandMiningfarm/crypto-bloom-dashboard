"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import OrdersPage from "@/pages/OrdersPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <OrdersPage />
    </ProtectedRoute>
  );
}
