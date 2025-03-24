"use client";

import {
  HeartHandshake,
  LayoutDashboard,
  Package,
  Rss,
  Ticket,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader className="bg-yellow-300">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-2xl font-semibold">Admin Panel</span>
                  <span className="text-sm">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-yellow-300">
        <SidebarMenu>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              className="rounded-none bg-yellow-300 p-6"
              asChild
              isActive={isActive("/products")}
            >
              <Link href="/products/">
                <Package className="h-8 w-8" />
                <span className="text-lg">Products</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="bg-yellow-300">
            <SidebarMenuButton
              className="rounded-none bg-yellow-300 p-6"
              asChild
              isActive={isActive("/users")}
            >
              <Link href="/users">
                <User className="h-8 w-8" />
                <span className="text-lg">Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="">
            <SidebarMenuButton
              className="rounded-none bg-yellow-300 p-6"
              asChild
              isActive={isActive("/events")}
            >
              <Link href="/events">
                <Ticket className="h-8 w-8" />
                <span className="text-lg">Events</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="">
            <SidebarMenuButton
              className="rounded-none bg-yellow-300 p-6"
              asChild
              isActive={isActive("/donations")}
            >
              <Link href="/donations">
                <HeartHandshake className="h-8 w-8" />
                <span className="text-lg">Donation History</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              className="rounded-none bg-yellow-300 p-6"
              asChild
              isActive={isActive("/blogs")}
            >
              <Link href="/blogs">
                <Rss />
                <span className="text-lg">Blogs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")}>
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
