"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUserStore from "@/stores/userStore";

const customers = [
  {
    id: "USR-001",
    name: "John Smith",
    email: "john.smith@example.com",
    joinedDate: "2025-01-15",
  },
  {
    id: "USR-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    joinedDate: "2025-01-20",
  },
  {
    id: "USR-003",
    name: "Michael Brown",
    email: "mbrown@example.com",
    joinedDate: "2025-02-05",
  },
  {
    id: "USR-004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    joinedDate: "2025-02-10",
  },
  {
    id: "USR-005",
    name: "Robert Wilson",
    email: "rwilson@example.com",
    joinedDate: "2025-02-15",
  },
  {
    id: "USR-006",
    name: "Jennifer Lee",
    email: "jlee@example.com",
    joinedDate: "2025-02-20",
  },
  {
    id: "USR-007",
    name: "David Miller",
    email: "dmiller@example.com",
    joinedDate: "2025-03-01",
  },
  {
    id: "USR-008",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    joinedDate: "2025-03-10",
  },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>Manage your user database.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete user</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
