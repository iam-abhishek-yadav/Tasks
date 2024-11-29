'use client'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'

import { Button } from '@/components/ui/button'
import { FaSun, FaMoon } from 'react-icons/fa'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import CreateTaskButton from '@/components/shared/create-task-button'
import { SIDEBAR_ITEMS } from './constants'

export function AppSidebar() {
  const username = 'John Doe'
  const profilePic = 'https://via.placeholder.com/150'
  const currentPath = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center space-x-2 mt-12 mb-4 px-4">
            <Image
              src={profilePic}
              alt="Profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">{username}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <FaSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <FaMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>

          <SidebarSeparator className="mb-2 mx-0" />

          <CreateTaskButton />

          <SidebarSeparator className="my-2 mx-0" />

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
                          : 'text-gray-700 dark:text-gray-400'
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
