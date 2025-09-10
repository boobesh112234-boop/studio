"use server";

import { analyzeScenario } from "@/ai/flows/ai-scenario-analysis";
import { z } from "zod";

const AssistantSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt cannot be empty." }),
});

export async function handleAiAssistantQuery(prevState: any, formData: FormData) {
  const validatedFields = AssistantSchema.safeParse({
    prompt: formData.get('prompt'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await analyzeScenario({ scenarioQuestion: validatedFields.data.prompt });
    return {
      data: result.analysisResult,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "An error occurred while analyzing the scenario. Please try again.",
    };
  }
}
