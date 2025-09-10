import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radar } from "lucide-react";

export default function RiskRadarPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-muted rounded-full p-3 w-fit">
            <Radar className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">Risk Radar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">A comprehensive risk radar dashboard is being developed to provide a high-level overview of potential threats.</p>
        </CardContent>
      </Card>
    </div>
  );
}
