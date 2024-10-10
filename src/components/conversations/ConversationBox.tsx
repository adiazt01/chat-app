import { useOtherProfile } from "@/hooks/useOtherProfile";
import { FullConversationType } from "@/types";
import { useSession, useUser } from "@clerk/nextjs";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";
import { Check } from "lucide-react";
import { Separator } from "../ui/separator";

interface InterfaceConversationBox {
  conversation: FullConversationType;
  selected?: boolean;
}

export function ConversationBox({
  conversation,
  selected,
}: InterfaceConversationBox) {
  const otherProfile = useOtherProfile(conversation);
  const router = useRouter();
  const auth = useUser();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    console.log(conversation);
    const messages = conversation.messages;
    console.log(messages);
    return messages[messages.length - 1];
  }, [conversation]);

  const profileEmail = useMemo(() => {
    return auth.user?.emailAddresses[0].emailAddress;
  }, [auth.user]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seenBy || [];

    return (
      seenArray.filter((profile) => profile.email === profileEmail).length !== 0
    );
  }, [lastMessage, profileEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.imageUrl) {
      return "📷 Photo";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Start a conversation!";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "w-full relative flex flex-row items-start space-x-2 hover:bg-neutral-100 p-3 rounded-lg cursor-pointer transition",
        selected ? "bg-neutral-100" : "bg-white",
      )}
    >
      <Avatar className="relative size-12">
        <AvatarImage src={otherProfile?.imageUrl} />
        <AvatarFallback>{otherProfile?.name[0]}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex flex-col gap-1 flex-1">
        <div className="focus:outline-none">
          <div className="flex flex-col justify-between  mb-1">
            <p className="text-md font-medium text-gray-900">
              {otherProfile?.name}
            </p>
            <div className="flex flex-col">
              {lastMessage?.createdAt && (
                <p className="text-sm text-gray-500">
                  {format(new Date(lastMessage.createdAt), "p")}
                </p>
              )}
              <div className="flex flex-row">
                {hasSeen ? (
                  <Check className="text-primary" />
                ) : (
                  <Check className="opacity-30 mr-1" />
                )}
                <p className="text-sm text-gray-500">{lastMessageText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
