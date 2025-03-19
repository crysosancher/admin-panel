"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import useDonationStore from "@/stores/donationStore";

// Sample donation data
// const donations = [
//   {
//     id: "DON-001",
//     name: "John Smith",
//     email: "john.smith@example.com",
//     amount: 250.0,
//     date: "2025-03-15",
//     message: "Keep up the great work!",
//   },
//   {
//     id: "DON-002",
//     name: "Sarah Johnson",
//     email: "sarah.j@example.com",
//     amount: 100.0,
//     date: "2025-03-14",
//     message: "Happy to support your cause.",
//   },
//   {
//     id: "DON-003",
//     name: "Michael Brown",
//     email: "mbrown@example.com",
//     amount: 500.0,
//     date: "2025-03-12",
//     message: "For the children's education program.",
//   },
//   {
//     id: "DON-004",
//     name: "Emily Davis",
//     email: "emily.davis@example.com",
//     amount: 75.0,
//     date: "2025-03-10",
//     message: "",
//   },
//   {
//     id: "DON-005",
//     name: "Robert Wilson",
//     email: "rwilson@example.com",
//     amount: 1000.0,
//     date: "2025-03-08",
//     message: "Annual donation for your foundation.",
//   },
//   {
//     id: "DON-006",
//     name: "Jennifer Lee",
//     email: "jlee@example.com",
//     amount: 150.0,
//     date: "2025-03-05",
//     message: "In memory of my father.",
//   },
//   {
//     id: "DON-007",
//     name: "David Miller",
//     email: "dmiller@example.com",
//     amount: 300.0,
//     date: "2025-03-03",
//     message: "To support the new building project.",
//   },
//   {
//     id: "DON-008",
//     name: "Lisa Anderson",
//     email: "lisa.a@example.com",
//     amount: 50.0,
//     date: "2025-03-01",
//     message: "Monthly contribution.",
//   },
// ];

export default function DonationsPage() {
  const { donations } = useDonationStore();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Donations</h1>
        <Button asChild>
          <Link href="donations/add">
            <Plus className="mr-2 h-4 w-4" />
            Add New Donation
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
          <CardDescription>View all donations received.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">{donation.id}</TableCell>
                  <TableCell>{donation.name}</TableCell>
                  <TableCell>{donation.email}</TableCell>
                  <TableCell className="text-right">
                    ${donation.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {new Date(donation.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {donation.message || "—"}
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
