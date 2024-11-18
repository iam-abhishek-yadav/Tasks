import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger className="fixed" />
        <div className="m-2">{children}</div>
      </main>
    </SidebarProvider>
  )
}
