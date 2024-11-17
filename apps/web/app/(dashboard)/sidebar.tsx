'use client'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import { SIDEBAR_ITEMS } from './constants'
import Link from 'next/link'

export function AppSidebar() {
  const username = 'John Doe'
  const profilePic = 'https://via.placeholder.com/150'
  const currentPath = usePathname()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl">Tasks</SidebarGroupLabel>

          <div className="flex items-center space-x-2 mt-2 mb-4 px-4">
            <Image
              src={profilePic}
              alt="Profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">{username}</span>
          </div>

          <hr className="border-t border-gray-300 mb-4" />

          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => {
                const isActive = currentPath === item.url

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${
                        isActive
                          ? 'bg-gray-800 text-white hover:bg-gray-800 hover:text-white'
                          : 'text-gray-700 '
                      }`}
                    >
                      <Link href={item.url}>
                        <div className="flex items-center space-x-2 p-2 rounded-md">
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
