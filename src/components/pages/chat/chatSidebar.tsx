import { Home, SquarePen } from 'lucide-react';
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
import Image from 'next/image';
import Logo from '../../../../public/logo.svg';
import { Button } from '@/components/ui/button';

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
          <SidebarGroupLabel className="text-2xl flex items-center justify-between">
            <Link href="/">
              <Image src={Logo} alt="Site Whiz logo" width={32} height={32} />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
            >
              <SquarePen />
            </Button>
          </SidebarGroupLabel>
          <Separator />
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              <SidebarMenuItem></SidebarMenuItem>
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
