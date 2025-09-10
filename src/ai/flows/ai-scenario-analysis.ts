'use server';

/**
 * @fileOverview AI-powered scenario analysis for supply chain disruptions.
 *
 * - analyzeScenario - A function that analyzes supply chain disruption scenarios.
 * - AnalyzeScenarioInput - The input type for the analyzeScenario function.
 * - AnalyzeScenarioOutput - The return type for the analyzeScenario function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeScenarioInputSchema = z.object({
  scenarioQuestion: z
    .string()
    .describe(
      'A natural language question about potential supply chain disruptions.'
    ),
});
export type AnalyzeScenarioInput = z.infer<typeof AnalyzeScenarioInputSchema>;

const AnalyzeScenarioOutputSchema = z.object({
  analysisResult: z
    .string()
    .describe('The AI-generated analysis of the scenario.'),
});
export type AnalyzeScenarioOutput = z.infer<typeof AnalyzeScenarioOutputSchema>;

export async function analyzeScenario(
  input: AnalyzeScenarioInput
): Promise<AnalyzeScenarioOutput> {
  return analyzeScenarioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeScenarioPrompt',
  input: {schema: AnalyzeScenarioInputSchema},
  output: {schema: AnalyzeScenarioOutputSchema},
  prompt: `You are an AI assistant specializing in supply chain risk analysis.

  A user will ask a question about a potential disruption to the supply chain.
  Provide a detailed analysis of the scenario, including potential impacts on cost, delivery times, and overall supply chain resilience.

  Question: {{{scenarioQuestion}}}`,
});

const analyzeScenarioFlow = ai.defineFlow(
  {
    name: 'analyzeScenarioFlow',
    inputSchema: AnalyzeScenarioInputSchema,
    outputSchema: AnalyzeScenarioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
