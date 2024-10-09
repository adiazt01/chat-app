import { SideBar } from "@/components/interface/SideBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SideBar>
      <div className="h-full ">{children}</div>
    </SideBar>
  );
}
