import { getCurrentProfile } from "@/actions/auth/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await getCurrentProfile();
    console.log("profile", profile);
    const body = await req.json();
    const { userId, isGroup, members, name } = body;

    if (!profile) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid Request", {
        status: 400,
      });
    }

    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          members: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: profile.id,
              },
            ],
          },
        },
        include: {
          members: true,
        },
      });

      return NextResponse.json(newConversation);
    }

    const existingConversation = await db.conversation.findMany({
      where: {
        AND: [
          {
            members: {
              some: {
                id: {
                  equals: userId,
                },
              },
            },
          },
          {
            members: {
              some: {
                id: {
                  equals: profile.id,
                },
              },
            },
          },
        ],
      },
    });

    const singleConversation = existingConversation[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await db.conversation.create({
      data: {
        members: {
          connect: [
            {
              id: userId,
            },
            {
              id: profile.id,
            },
          ],
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    console.error(`[CONVERSATIONS]: ${error}`);

    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
