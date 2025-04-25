import ChatSidebar from '@/components/pages/chat/chatSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <ChatSidebar />
        <section className="w-full">
          <SidebarTrigger className="sticky top-0 left-4" />
          {children}
        </section>
      </SidebarProvider>
    </div>
  );
}

export default ChatLayout;
