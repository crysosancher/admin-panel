"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
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

const formSchema = z.object({
  title: z.string().min(2, "Product title must be at least 2 characters."),
  description: z.string().optional(),
  rating: z.coerce.number().min(0).max(5),
  sizes: z.string(),
  color: z.string(),
  price: z.coerce.number().positive("Price must be a positive number."),
  mrp: z.coerce.number().positive("MRP must be a positive number."),
  available: z.string(),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Please upload an image"),
});

export default function AddProductForm() {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      rating: 0,
      sizes: "",
      color: "",
      price: 0,
      mrp: 0,
      available: "yes",
      // A placeholder file; it will be replaced once the user uploads an image.
      image: new File([], "placeholder"),
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file: File = acceptedFiles[0]!;
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      form.setValue("image", file);
      form.clearErrors("image");
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
    console.log(values);
    toast.success(
      `Product image uploaded successfully 🎉 ${values.image.name}`,
    );
    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
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
                <FormDescription>Product rating from 0 to 5</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
              <FormItem>
                <FormLabel className="text-lg">Available</FormLabel>
                <FormControl>
                  <select
                    onChange={(e) => field.onChange(e.target.value)}
                    defaultValue={field.value}
                    className="rounded border bg-white p-2"
                  >
                    <option value="">Is product available?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          {/* Image Uploader */}
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem className="">
                <FormLabel
                  className={
                    fileRejections.length !== 0 ? "text-destructive" : ""
                  }
                >
                  <h2 className="text-xl font-semibold tracking-tight">
                    Upload Product Image
                  </h2>
                </FormLabel>
                <FormControl>
                  <div
                    {...getRootProps()}
                    className="mx-auto flex h-full cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground bg-white p-8 shadow-sm shadow-foreground"
                  >
                    {preview && (
                      <Image
                        src={preview as string}
                        alt="Uploaded image"
                        className="max-h-[200px] rounded-lg object-contain"
                        width={400}
                        height={300}
                        layout="intrinsic"
                      />
                    )}
                    <Input
                      {...getInputProps()}
                      type="file"
                      className="hidden"
                    />
                    {isDragActive ? (
                      <p>Drop the image!</p>
                    ) : (
                      <p>Click or drag an image to upload a product image</p>
                    )}
                  </div>
                </FormControl>
                <FormMessage>
                  {fileRejections.length !== 0 && (
                    <p>
                      Image must be less than 1MB and of type png, jpg, or jpeg
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
              <FormItem>
                <FormLabel className="text-lg">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="h-[200px] bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            className="block h-auto rounded-lg px-8 py-3 text-xl"
            variant="outline"
            type="button"
            asChild
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="block h-auto rounded-lg px-8 py-3 text-xl"
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
