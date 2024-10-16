import { Profile } from "@prisma/client";
import { ProfileBox } from "./ProfileBox";

interface ProfileListProps {
  profiles: Profile[];
}

export function ProfilesList({ profiles }: ProfileListProps) {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex-col text-2xl font-bold text-neutral-800 py-4">
          People
        </div>
      </div>
      {profiles.map((profile) => (
        <ProfileBox key={profile.id} profile={profile} />
      ))}
    </aside>
  );
}
