import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getCurrentProfile() {
  const user = auth();

  if (!user) {
    return null;
  }

  const currentProfile = await db.profile.findFirst({
    where: {
      userId: user.userId!,
    },
  });

  return currentProfile;
}
