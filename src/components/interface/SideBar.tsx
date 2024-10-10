import { auth } from "@clerk/nextjs/server";
import { DesktopSidebar } from "../sidebar/DesktopSidebar";
import { MobileSidebar } from "../sidebar/MobileSidebar";
import { getCurrentProfile } from "@/actions/auth/auth";

export async function SideBar({ children }: { children: React.ReactNode }) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    return auth().redirectToSignIn();
  }

  return (
    <div className="h-full">
      <DesktopSidebar currentProfile={currentProfile} />
      <MobileSidebar />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
