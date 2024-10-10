import { FullConversationType } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";

export const useOtherProfile = (
  conversation: FullConversationType, // | { profile: Profile[] }// ,
) => {
  const auth = useUser();

  const otherProfile = useMemo(() => {
    const currentProfileEmail = auth.user?.emailAddresses[0].emailAddress;

    const otherProfile = conversation.members.find(
      (member) => member.email !== currentProfileEmail,
    );

    return otherProfile;
  }, [auth.user?.emailAddresses, conversation.members]);

  return otherProfile;
};
