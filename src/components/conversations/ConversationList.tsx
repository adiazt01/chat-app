"use client";

import { useConversation } from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import clsx from "clsx";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { ConversationBox } from "./ConversationBox";

interface ConversationListProps {
  conversations: FullConversationType[];
}

export function ConversationList({ conversations }: ConversationListProps) {
  const [items, setItems] = useState(conversations);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        "flex inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
        isOpen ? "block" : "hidden w-full left-0",
      )}
    >
      <div className="px-3">
        <div className="flex justify-between items-center mb-4 pt-4">
          <div className="text-2xl font-bold">Messages</div>
          <div>
            <Button size="icon">
              <UserPlus />
            </Button>
          </div>
        </div>
        {conversations.map((conversation) => (
          <ConversationBox
            key={conversation.id}
            conversation={conversation}
            selected={conversation.id === conversationId}
          />
        ))}
      </div>
    </aside>
  );
}
