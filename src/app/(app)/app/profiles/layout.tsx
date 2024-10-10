import { getProfiles } from "@/actions/profile/profile";
import { SideBar } from "@/components/interface/SideBar";
import { ProfilesList } from "@/components/profiles/ProfilesList";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getProfiles();

  return (
    <SideBar>
      <div className="h-full">
        <ProfilesList profiles={users} />
        {children}
      </div>
    </SideBar>
  );
}
