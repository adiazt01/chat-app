import { getConversations } from "@/actions/conversation/conversation";
import { ConversationList } from "@/components/conversations/ConversationList";
import { SideBar } from "@/components/interface/SideBar";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    <SideBar>
      <div className="min-h-screen flex flex-row">
        <ConversationList conversations={conversations} />
        {children}
      </div>
    </SideBar>
  );
}
