"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUserStore, { User } from "@/stores/userStore";
import { Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import ProductsPage from "../products/page";

const users = [{}];
export default function CustomersPage() {
  const { users, deleteUser } = useUserStore();

  const handleDelete = (id: string) => {
    deleteUser(id);
    toast.success("User deleted successfully!");
  };
  console.log(users);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        {/* <Button asChild>
          <Link href="/dashboard/customers/add">
            <Plus className="mr-2 h-4 w-4" />
            Add New Customer
          </Link>
        </Button> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>Manage your user database.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {users.length > 0 ? (
              users.map((user: User) => (
                <Card key={user.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div>
                        <h3 className="font-semibold">{user?.name}</h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Mail className="mr-1 h-3 w-3" />
                          {user?.email}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Link href={`/users/edit/${user.id}`}>Edit</Link>
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No users added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
