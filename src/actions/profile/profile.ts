import db from "@/lib/db";
import { getCurrentProfile } from "../auth/auth";

export async function getProfiles() {
  const user = await getCurrentProfile();

  if (!user) {
    return [];
  }

  try {
    const profiles = await db.profile.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: user.email,
        },
      },
    });

    return profiles;
  } catch (error) {
    console.error(`[PROFILE] Error fetching user: ${error}`);
  }
}
