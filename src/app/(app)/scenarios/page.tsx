import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListCollapse } from "lucide-react";

export default function ScenariosPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-muted rounded-full p-3 w-fit">
            <ListCollapse className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">Scenario Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">A detailed scenario management and creation interface is coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
