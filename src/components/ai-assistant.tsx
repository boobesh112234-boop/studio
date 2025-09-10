"use client";

import { useEffect, useRef, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Bot, Send, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handleAiAssistantQuery } from "@/lib/actions";
import type { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? (
        <div className="h-5 w-5 border-2 border-background border-t-primary rounded-full animate-spin" />
      ) : (
        <Send className="h-5 w-5" />
      )}
      <span className="sr-only">Send</span>
    </Button>
  );
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [state, formAction] = useActionState(handleAiAssistantQuery, null);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state?.data) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: state.data }]);
      formRef.current?.reset();
    }
  }, [state]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleFormSubmit = (formData: FormData) => {
    const prompt = formData.get('prompt') as string;
    if (prompt.trim()) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: prompt }]);
      formAction(formData);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Bot className="h-6 w-6 text-primary" />
        AI Assistant
      </h2>
      <ScrollArea className="flex-1 -mx-4">
        <div className="px-4 space-y-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="p-2 bg-primary rounded-full">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
              )}
              <div
                className={cn(
                  "p-3 rounded-lg max-w-[80%]",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
               {message.role === "user" && (
                <div className="p-2 bg-muted rounded-full">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <form
        ref={formRef}
        action={handleFormSubmit}
        className="mt-4"
      >
        <div className="relative">
          <Input
            name="prompt"
            placeholder="e.g., What if Port X shuts down?"
            className="pr-12"
            required
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <SubmitButton />
          </div>
        </div>
        {state?.error && (
            <Alert variant="destructive" className="mt-2">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {typeof state.error === 'string' ? state.error : 'There was an issue with the request.'}
              </AlertDescription>
            </Alert>
          )}
      </form>
    </div>
  );
}
