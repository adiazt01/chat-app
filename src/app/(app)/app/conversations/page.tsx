"use client";

import clsx from "clsx";

import { useConversation } from "@/hooks/useConversation";
import { EmptyState } from "@/components/interface/EmptyState";

export default function Conversation() {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx(
        "w-full h-full border border-red-500 lg:block",
        isOpen ? "block" : "hidden",
      )}
    >
      <EmptyState />
    </div>
  );
}
