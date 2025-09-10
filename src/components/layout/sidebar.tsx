'use client';

import { usePathname } from 'next/navigation';
import { Bot, LayoutDashboard, ListCollapse, MapIcon, Radar } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { ResilientChainIcon } from '@/components/icons';
import Link from 'next/link';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/map', label: 'Map', icon: MapIcon },
  { href: '/scenarios', label: 'Scenarios', icon: ListCollapse },
  { href: '/risk-radar', label: 'Risk Radar', icon: Radar },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Bot },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <ResilientChainIcon className="size-8 text-primary" />
          <span className="text-lg font-semibold">ResilientChain</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: 'right' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
