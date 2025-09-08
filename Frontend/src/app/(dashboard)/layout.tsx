// src/app/(dashboard)/layout.tsx
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Menu } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <header className="flex items-center justify-between lg:justify-end">
            {/* Sidebar trigger for mobile */}
            <div className="lg:hidden">
              <SidebarTrigger>
                <Menu className="h-6 w-6" />
              </SidebarTrigger>
            </div>
            {/* You can add a User Profile button here */}
          </header>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}