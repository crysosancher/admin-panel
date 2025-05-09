"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Upload, X } from "lucide-react";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { toast } from "react-toastify";
import useEventStore, { PricingType } from "@/stores/eventStore";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Event title must be at least 2 characters.",
  }),
  days: z.array(z.string()).min(1, {
    message: "Please select at least one day.",
  }),
  startDate: z.string().min(1, {
    message: "Please select a start date.",
  }),
  endDate: z.string().min(1, {
    message: "Please select an end date.",
  }),
  startTime: z.string().min(1, {
    message: "Please select a start time.",
  }),
  endTime: z.string().min(1, {
    message: "Please select an end time.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  pricingType: z.nativeEnum(PricingType),

  price: z.coerce
    .number()
    .optional()
    .refine(
      (val) => {
        if (val === undefined) return true;
        return val > 0;
      },
      {
        message: "Price must be greater than 0.",
      },
    ),
  details: z.string().optional(),
  image: z.string().nonempty("Please upload an image"),
});

export default function AddEventPage() {
  const router = useRouter();
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      days: [],
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      location: "",
      pricingType: PricingType.FREE,
      price: undefined,
      details: "",
      image: "",
    },
  });

  const { addEvent } = useEventStore();

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      if (!file) return; // extra safety check

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
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

  const watchPricingType = form.watch("pricingType");

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const eventData = {
      ...values,
      price: values.pricingType === PricingType.FREE ? 0 : values.price || 0,
      details: values.details || "",
    };

    addEvent(eventData);

    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast.success("Event added successfully!");
      router.push("/events");
    }, 1000);
  }
  const days = [
    { id: "sun", label: "Sunday" },
    { id: "mon", label: "Monday" },
    { id: "tue", label: "Tuesday" },
    { id: "wed", label: "Wednesday" },
    { id: "thu", label: "Thursday" },
    { id: "fri", label: "Friday" },
    { id: "sat", label: "Saturday" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="hover:bg-[#FDFAF6]"
          size="icon"
          asChild
        >
          <Link href="/events">
            <ArrowLeft style={{ width: "36px", height: "36px" }} />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Event</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
          <CardDescription>
            Fill in the details for your new event.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="">
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem className="max-h-[20rem]">
                      <FormLabel
                        className={
                          fileRejections.length !== 0 ? "text-destructive" : ""
                        }
                      >
                        <h2 className="text-xl font-semibold tracking-tight">
                          Upload Product Image
                        </h2>
                      </FormLabel>
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
                                    <div className="relative aspect-video h-[15rem] w-full overflow-hidden rounded-md">
                                      <Image
                                        src={preview as string}
                                        alt="Preview"
                                        height={300}
                                        width={500}
                                        className="h-full w-full object-contain"
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
                                      <span className="sr-only">
                                        Remove image
                                      </span>
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage>
                              {fileRejections.length !== 0 && (
                                <p>
                                  Image must be less than 1MB and of type png,
                                  jpg, or jpeg
                                </p>
                              )}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
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
              </div>
              <FormField
                control={form.control}
                name="days"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Days</FormLabel>
                      <FormDescription>
                        Select the days when the event will take place.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {days.map((day) => (
                        <FormField
                          key={day.id}
                          control={form.control}
                          name="days"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={day.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(day.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            day.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== day.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {day.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pricingType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Pricing</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={PricingType.FREE} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Free Event
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={PricingType.PAID} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Paid Event
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchPricingType === PricingType.PAID && (
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Enter ticket price"
                          {...field}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? undefined
                                : Number.parseFloat(e.target.value);
                            field.onChange(value);
                          }}
                          value={field.value === undefined ? "" : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter event details and description"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" asChild>
                  <Link href="/events">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Event"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
