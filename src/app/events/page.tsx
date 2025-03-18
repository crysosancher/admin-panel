import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        {/* <Button asChild>
          <Link href="/dashboard/events/add">
            <Plus className="mr-2 h-4 w-4" />
            Add New Event
          </Link>
        </Button> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event List</CardTitle>
          <CardDescription>Manage your upcoming events.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-muted"></div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Event Title {i + 1}</h3>
                  <div className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>March {20 + i}, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>Event Location {i + 1}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {i % 2 === 0 ? "Free" : `$${(i + 1) * 10}`}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
