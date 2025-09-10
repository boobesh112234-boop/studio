import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapIcon } from "lucide-react";

export default function MapPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-muted rounded-full p-3 w-fit">
            <MapIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">Map View</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">A dedicated map view is coming soon. For now, please use the map on the dashboard.</p>
        </CardContent>
      </Card>
    </div>
  );
}
