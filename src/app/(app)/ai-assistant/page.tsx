import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export default function AiAssistantPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-muted rounded-full p-3 w-fit">
            <Bot className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">AI Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">A dedicated, full-screen AI Assistant interface is coming soon. For now, please use the assistant panel on the right.</p>
        </CardContent>
      </Card>
    </div>
  );
}
