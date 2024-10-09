import { DesktopSidebar } from "../sidebar/DesktopSidebar";
import { MobileSidebar } from "../sidebar/MobileSidebar";

export function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <MobileSidebar />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
