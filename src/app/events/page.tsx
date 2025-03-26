"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useEventStore from "@/stores/eventStore";
import { Plus, Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

export default function EventsPage() {
  const { events, deleteEvent } = useEventStore();

  const handleDelete = (id: string) => {
    deleteEvent(id);
    toast.success("Event deleted successfully!");
  };
  console.log(events);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <Button asChild>
          <Link href="/events/add">
            <Plus className="mr-2 h-4 w-4" />
            Add New Event
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event List</CardTitle>
          <CardDescription>Manage your upcoming events.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.length > 0 ? (
              events.map((event, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-auto h-[300px] bg-muted">
                    <Image
                      className="h-full"
                      src={event.image as unknown as string}
                      alt="Product Image"
                      width={400}
                      height={500}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <div className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{event.startDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {event.pricingType === "free"
                              ? "Free"
                              : event.price}
                          </span>
                        </div>
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Link href={`/events/edit/${event.id}`}>Edit</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => handleDelete(event.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No events added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
