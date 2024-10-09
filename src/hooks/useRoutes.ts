import { useAuth } from "@clerk/nextjs";
import { LogOut, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useConversation } from "./useConversation";

export const useRoutes = () => {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        active: pathname === "/conversations" || !!conversationId,
        icon: MessageCircle,
      },
      {
        label: "App",
        href: "/app",
        active: pathname === "/app",
        icon: MessageCircle,
      },
      {
        label: "Logout",
        href: "#",
        onClick: async () => await signOut(),
        icon: LogOut,
      },
    ],
    [pathname, conversationId, signOut],
  );

  return routes;
};
