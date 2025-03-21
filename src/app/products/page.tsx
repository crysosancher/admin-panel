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
import { useState } from "react";

export default function ProductsPage() {
  // Only use deleteProduct from the store since filtering will be done on searchProducts.
  const { deleteProduct } = useProductStore();
  const [query, setQuery] = useState("");
  const searchProducts = useProductStore((state) => state.searchProducts);
  // Filter products by title using the search query.
  const filteredProducts = searchProducts(query);

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success("Product deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <div className="flex items-center gap-4">
          <Input
            className="rounded-lg bg-black text-white placeholder:text-white"
            type="text"
            value={query}
            placeholder="Search products by title..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href="/products/add">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>Manage your products inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product: Product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square bg-muted">
                    <Image
                      src={product.image as string}
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
              <p>No products found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
