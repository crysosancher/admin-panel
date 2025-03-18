"use client";
import "../styles/globals.css";
import type React from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminSidebar } from "./_components/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Admin Panel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="">
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
            {/* sidebar Header */}
            <header className="flex h-16 items-center justify-between border-b-2 bg-yellow-300 px-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="h-8 w-8" />
              </div>
              <div className="flex w-full items-center justify-center text-3xl font-bold">
                {" "}
                ADMIN PANEL
              </div>
            </header>
            {/* body */}
            <main className="flex-1 bg-yellow-300 p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
