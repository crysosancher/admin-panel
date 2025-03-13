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

export default function ProductsPage() {
  return (
    // <div className="space-y-6">
    //   <div className="flex items-center justify-between">
    //     <h1 className="text-3xl font-bold tracking-tight">Products</h1>
    //     <Button asChild>
    //       <Link href="/products/add">
    //         <Plus className="mr-2 h-4 w-4" />
    //         Add New Product
    //       </Link>
    //     </Button>
    //   </div>

    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Product List</CardTitle>
    //       <CardDescription>Manage your products inventory.</CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    //         {Array.from({ length: 8 }).map((_, i) => (
    //           <Card key={i} className="overflow-hidden">
    //             <div className="aspect-square bg-muted"></div>
    //             <CardContent className="p-4">
    //               <h3 className="font-semibold">Product Name {i + 1}</h3>
    //               <div className="mt-2 flex items-center justify-between">
    //                 <span className="text-sm font-medium">$99.99</span>
    //                 <span className="text-xs text-muted-foreground">
    //                   In Stock
    //                 </span>
    //               </div>
    //               <div className="mt-4 flex items-center gap-2">
    //                 <Button variant="outline" size="sm" className="w-full">
    //                   Edit
    //                 </Button>
    //                 <Button variant="outline" size="sm" className="w-full">
    //                   View
    //                 </Button>
    //               </div>
    //             </CardContent>
    //           </Card>
    //         ))}
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
    <div>HI</div>
  );
}
