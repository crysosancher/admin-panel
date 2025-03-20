"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";
import { toast } from "react-toastify";
import useBlogStore from "@/stores/blogStore";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Blog title must be at least 2 characters.",
  }),
  date: z.string(),
  image: z.string().min(1, {
    message: "Please upload a blog image.",
  }),
  content: z
    .array(
      z.string().min(1, {
        message: "Content cannot be empty.",
      }),
    )
    .min(1, {
      message: "Please add at least one content block.",
    }),
});

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const { blogs, updateBlog } = useBlogStore();
  console.log(blogs);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Find the blog by ID
  const blog = blogs.find((blog) => blog.id === params.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: "",
      content: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "content",
  });

  // Set form values when blog data is available
  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        image: blog.image,
        content: blog.content,
      });
      setPreviewImage(blog.image);
    }
  }, [blog, form]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target?.result as string;
          setPreviewImage(base64String);
          form.setValue("image", base64String);
        };
        reader.readAsDataURL(file);
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    updateBlog({ ...values, id });
    toast.success("Blog Updated");
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);

      router.push("/blogs");
    }, 1000);
  }

  if (!blog) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Blog not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/blogs">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Blog</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Information</CardTitle>
          <CardDescription>Edit your blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Image</FormLabel>
                    <FormControl>
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
                          <Input type="hidden" {...field} />
                        </div>
                        {previewImage && (
                          <div className="relative">
                            <div className="relative aspect-video w-full overflow-hidden rounded-md">
                              <Image
                                src={previewImage || "/placeholder.svg"}
                                alt="Preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute right-2 top-2"
                              onClick={() => {
                                setPreviewImage(null);
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <FormLabel>Blog Content</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append("")}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Paragraph
                  </Button>
                </div>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="relative">
                      <FormField
                        control={form.control}
                        name={`content.${index}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Textarea
                                  placeholder={`Paragraph ${index + 1}`}
                                  className="min-h-[120px] pr-10"
                                  {...field}
                                />
                                {fields.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-2"
                                    onClick={() => remove(index)}
                                  >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">
                                      Remove paragraph
                                    </span>
                                  </Button>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
                {form.formState.errors.content?.root && (
                  <p className="mt-2 text-sm font-medium text-destructive">
                    {form.formState.errors.content.root.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" asChild>
                  <Link href="/dashboard/blogs">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Blog"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
