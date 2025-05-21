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
import ThemeToggle from '@/components/theme/themeToggle';

// Menu items
const items = [
  {
    title: 'About me?',
    url: 'https://www.theharrisonrogers.com/',
  },
  {
    title: 'Source code',
    url: 'https://github.com/HarrisonRogers/site-whiz',
  },
  {
    title: 'Vercel AI SDK',
    url: 'https://ai-sdk.dev/docs/introduction',
  },
  {
    title: 'Chat GPT vision feature',
    url: 'https://platform.openai.com/docs/guides/images-vision?api-mode=chat',
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
                    <Link href={item.url} target="_blank">
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
