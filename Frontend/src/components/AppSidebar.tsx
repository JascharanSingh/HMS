// src/components/AppSidebar.tsx
'use client';

import {
  Calendar,
  LayoutDashboard,
  Stethoscope,
  Users,
  FileText,
  DollarSign,
} from 'lucide-react';
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
import { usePathname } from 'next/navigation';

// Update this with your actual routes
const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, url: '/' },
  { title: 'Patients', icon: Users, url: '/patients' },
  { title: 'Doctors', icon: Stethoscope, url: '/doctors' },
  { title: 'Appointments', icon: Calendar, url: '/appointments' },
  { title: 'Billing', icon: DollarSign, url: '/billing' },
  { title: 'Medical Records', icon: FileText, url: '/records' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                  >
                    <a href={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
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