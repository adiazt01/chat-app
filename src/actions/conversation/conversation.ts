import db from "@/lib/db";
import { getCurrentProfile } from "../auth/auth";
import { FullConversationType } from "@/types";

export async function getConversations(): Promise<FullConversationType[]> {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    return [];
  }

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        members: {
          some: {
            id: currentProfile.id,
          },
        },
      },
      include: {
        members: true,
        messages: {
          take: 1,
          include: {
            sender: true,
            seenBy: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return conversations;
  } catch (error) {
    console.log(`[getConversations] Error: ${error}`);
    return [];
  }
}
