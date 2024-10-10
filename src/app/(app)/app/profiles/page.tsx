"use client";

import { EmptyState } from "@/components/interface/EmptyState";

export default function AppPage() {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
}
