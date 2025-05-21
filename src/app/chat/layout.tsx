import ChatSidebar from '@/components/pages/chat/chatSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider defaultOpen={false}>
        <ChatSidebar />
        <section className="w-full h-screen">
          <SidebarTrigger className="sticky top-1 left-4 hover:bg-transparent" />
          {children}
        </section>
      </SidebarProvider>
    </div>
  );
}

export default ChatLayout;
