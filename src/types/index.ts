import { Conversation, Message, Profile } from "@prisma/client";

export type FullMessageType = Message & {
  sender: Profile;
  seenBy: Profile[];
};

export type FullConversationType = Conversation & {
  messages: FullMessageType[];
  members: Profile[];
};
