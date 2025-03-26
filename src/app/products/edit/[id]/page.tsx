"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import Image from "next/image";
import useProductStore from "@/stores/productStore";
import { ArrowLeft, Upload, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  title: z.string().min(2, "Product title must be at least 2 characters."),
  description: z.string().optional(),
  rating: z.coerce.number().min(0).max(5),
  sizes: z.string(),
  color: z.string(),
  price: z.coerce.number().positive("Price must be a positive number."),
  mrp: z.coerce.number().positive("MRP must be a positive number."),
  available: z.string(),
  image: z.string(),
});

export default function EditProductForm({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  //   alert(id);
  const router = useRouter();
  const { getProductById, updateProduct } = useProductStore();
  const product = getProductById(id);

  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: product
      ? {
          title: product.title,
          description: product.description,
          rating: product.rating,
          sizes: product.sizes,
          color: product.color,
          price: product.price,
          mrp: product.mrp,
          available: product.available,
          image: product.image,
        }
      : undefined,
  });

  useEffect(() => {
    if (product && product.image) {
      setPreview(product.image);
    }
  }, [product]);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        form.setValue("image", base64String);
        form.clearErrors("image");
      };
      reader.readAsDataURL(file);
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    updateProduct({ ...values, id });
    toast.success("Product updated successfully 🎉");
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/products");
    }, 1000);
  };

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="hover:bg-yellow-200"
          size="icon"
          asChild
        >
          <Link href="/products">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Update Product</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Update the details for your product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Product Details */}
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Product Title</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder="Enter product title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Rating</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Product rating from 0 to 5
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Image Uploader */}
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Product Image</FormLabel>
                      <FormControl className="flex justify-between">
                        <div className="space-y-4">
                          <div
                            {...getRootProps()}
                            className={`flex cursor-pointer items-center justify-center rounded-md border-2 border-dashed p-6 ${
                              isDragActive
                                ? "border-primary bg-primary/10"
                                : "border-border"
                            }`}
                          >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center gap-2">
                              <Upload className="h-8 w-8 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                {isDragActive
                                  ? "Drop the image here"
                                  : "Drag & drop an image here, or click to select"}
                              </p>
                            </div>
                            <Input type="hidden" />
                          </div>
                          {preview && (
                            <div className="relative">
                              <div className="relative aspect-video w-full overflow-hidden rounded-md">
                                <Image
                                  src={preview as string}
                                  alt="Preview"
                                  height={300}
                                  width={500}
                                  className="object-cover"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute right-2 top-2"
                                onClick={() => {
                                  setPreview(null);
                                  form.setValue("image", "");
                                }}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove image</span>
                              </Button>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage>
                        {fileRejections.length !== 0 && (
                          <p>
                            Image must be less than 1MB and of type png, jpg, or
                            jpeg
                          </p>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Product Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-lg">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
                          className="h-[20rem] bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem className="space-x-2">
                      <FormLabel className="text-lg">Sizes</FormLabel>
                      <FormControl>
                        <select
                          onChange={(e) => field.onChange(e.target.value)}
                          defaultValue={field.value}
                          className="rounded border bg-white p-2"
                        >
                          <option value="">Select available sizes</option>
                          <option value="s">S</option>
                          <option value="m">M</option>
                          <option value="l">L</option>
                          <option value="xl">XL</option>
                          <option value="xxl">XXL</option>
                          <option value="all">All Sizes</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem className="space-x-2">
                      <FormLabel className="text-lg">Color</FormLabel>
                      <FormControl>
                        <select
                          onChange={(e) => field.onChange(e.target.value)}
                          defaultValue={field.value}
                          className="rounded border bg-white p-2"
                        >
                          <option value="">Select color</option>
                          <option value="black">Black</option>
                          <option value="white">White</option>
                          <option value="red">Red</option>
                          <option value="blue">Blue</option>
                          <option value="green">Green</option>
                          <option value="yellow">Yellow</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Price</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          type="number"
                          min="0"
                          step="0.01"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mrp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">MRP</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          type="number"
                          min="0"
                          step="0.01"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Maximum Retail Price</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="available"
                  render={({ field }) => (
                    <FormItem className="space-x-2">
                      <FormLabel className="text-lg">Available</FormLabel>
                      <FormControl>
                        <select
                          onChange={(e) => field.onChange(e.target.value)}
                          defaultValue={field.value}
                          className="rounded border bg-white p-2"
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button
                  asChild
                  variant="outline"
                  type="button"
                  className="rounded-lg px-8 py-3 text-xl"
                >
                  <Link href="/products">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg px-8 py-3 text-xl"
                >
                  {isSubmitting ? "Updating..." : "Update Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
