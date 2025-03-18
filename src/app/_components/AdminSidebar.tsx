"use client";

import {
  Banknote,
  BarChart3,
  Box,
  Home,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  ShoppingCartIcon,
  Ticket,
  TicketPlus,
  User,
  User2Icon,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
      <SidebarHeader className="bg-yellow-400">
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
      <SidebarContent className="bg-yellow-400">
        <SidebarMenu>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              className="rounded-none bg-white p-6"
              asChild
              isActive={isActive("/products")}
            >
              <Link href="/products/">
                <Package className="h-8 w-8" />
                <span className="text-lg">Products</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              className="rounded-none bg-white p-6"
              asChild
              isActive={isActive("/products")}
            >
              <Link href="/products/add">
                <ShoppingCartIcon className="h-8 w-8" />
                <span className="text-lg">Add New Product</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              className="rounded-none bg-white p-6"
              asChild
              isActive={isActive("/products")}
            >
              <Link href="/users">
                <User className="h-8 w-8" />
                <span className="text-lg">Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              className="rounded-none bg-white p-6"
              asChild
              isActive={isActive("/products")}
            >
              <Link href="/users/add">
                <UserPlus className="h-8 w-8" />
                <span className="text-lg">Add New User</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              className="rounded-none bg-white p-6"
              asChild
              isActive={isActive("/products")}
            >
              <Link href="/events">
                <Ticket className="h-8 w-8" />
                <span className="text-lg">Events</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              className="rounded-none bg-white p-6"
              asChild
              isActive={isActive("/products")}
            >
              <Link href="/events/add">
                <TicketPlus className="h-8 w-8" />
                <span className="text-lg">Add New Event</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              className="rounded-none bg-white p-6"
              asChild
              isActive={isActive("/products")}
            >
              <Link href="/products/add">
                <Banknote className="h-8 w-8" />
                <span className="text-lg">Donation History</span>
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
