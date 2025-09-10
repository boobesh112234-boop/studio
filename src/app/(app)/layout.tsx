import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/sidebar';
import AppHeader from '@/components/layout/header';
import AiAssistant from '@/components/ai-assistant';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full">
        <AppHeader />
        <main className="flex-1 flex overflow-hidden">
          <SidebarInset className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </SidebarInset>
          <div className="hidden lg:block w-[350px] xl:w-[400px] border-l border-border p-4">
            <AiAssistant />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
