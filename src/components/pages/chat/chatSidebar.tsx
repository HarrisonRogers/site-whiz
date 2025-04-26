import { SquarePen } from 'lucide-react';
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
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/theme/themeToggle';
import Tooltip from '@/components/ui/tooltip/tooltip';

// Menu items
const items = [
  {
    title: 'New chat',
    url: '/',
  },
  {
    title: 'Chats',
    url: '/',
  },
  {
    title: 'Settings',
    url: '/',
  },
  {
    title: 'Help',
    url: '/',
  },
  {
    title: 'About',
    url: '/',
  },
  {
    title: 'Logout',
    url: '/',
  },
];

export default function ChatSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-gray-100 dark:bg-neutral-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl flex items-center justify-between">
            <Link href="/">
              <Logo className="size-8" />
            </Link>
            <div>
              <ThemeToggle />
              <Tooltip toolTipContent="New chat">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent"
                >
                  <SquarePen />
                </Button>
              </Tooltip>
            </div>
          </SidebarGroupLabel>
          <Separator className="mt-2 mb-4" />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200"
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
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
