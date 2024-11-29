import { AppSidebar } from '@/components/shared/sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger className="fixed left-2 top-4 z-50 " />
        <div className="m-2">{children}</div>
      </main>
    </SidebarProvider>
  )
}
