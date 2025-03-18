// pages/products/index.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import useProductStore, { Product } from "@/stores/productStore";
import Image from "next/image";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  const { products, deleteProduct } = useProductStore();

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success("Product deleted successfully!");
  };
  console.log(products);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <Input
          className="w-[500px] border-2 border-black"
          type="text"
          placeholder="Search Products"
        />

        {/* <Button asChild>
          <Link href="/products/add">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>Manage your products inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.length > 0 ? (
              products.map((product: Product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square bg-muted">
                    <Image
                      src={product.image as unknown as string}
                      alt="Product Image"
                      width={400}
                      height={300}
                      layout="responsive"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{product.title}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        ${product.price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {product.available === "yes"
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Link href={`/products/edit/${product.id}`}>Edit</Link>
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No products added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
