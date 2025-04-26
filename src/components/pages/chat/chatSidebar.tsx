import { Home } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Separator from '@/components/ui/separator';

// Menu items
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
];

export default function ChatSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-gray-100 dark:bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl">Site Whiz</SidebarGroupLabel>
          <Separator />
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
