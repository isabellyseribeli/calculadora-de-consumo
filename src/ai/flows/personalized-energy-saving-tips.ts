'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized energy-saving tips to users.
 *
 * It takes household energy consumption data and appliance usage as input and returns tailored recommendations.
 * @fileOverview A personalized energy-saving tips AI agent.
 *
 * - getPersonalizedEnergySavingTips - A function that returns personalized energy saving tips.
 * - PersonalizedEnergySavingTipsInput - The input type for the getPersonalizedEnergySavingTips function.
 * - PersonalizedEnergySavingTipsOutput - The return type for the getPersonalizedEnergySavingTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedEnergySavingTipsInputSchema = z.object({
  householdSize: z
    .number()
    .describe('The number of people living in the household.'),
  location: z.string().describe('The geographic location of the household.'),
  averageMonthlyConsumption: z
    .number()
    .describe('The average monthly energy consumption in kWh.'),
  applianceUsage: z
    .record(z.string(), z.number())
    .describe(
      'A record of appliance usage, with appliance names as keys and daily usage time in hours as values.'
    ),
});
export type PersonalizedEnergySavingTipsInput = z.infer<
  typeof PersonalizedEnergySavingTipsInputSchema
>;

const PersonalizedEnergySavingTipsOutputSchema = z.object({
  tips: z
    .array(z.string())
    .describe('A list of personalized energy-saving tips.'),
});

export type PersonalizedEnergySavingTipsOutput = z.infer<
  typeof PersonalizedEnergySavingTipsOutputSchema
>;

export async function getPersonalizedEnergySavingTips(
  input: PersonalizedEnergySavingTipsInput
): Promise<PersonalizedEnergySavingTipsOutput> {
  return personalizedEnergySavingTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedEnergySavingTipsPrompt',
  input: {schema: PersonalizedEnergySavingTipsInputSchema},
  output: {schema: PersonalizedEnergySavingTipsOutputSchema},
  prompt: `You are an energy efficiency expert providing personalized energy-saving tips.

  Based on the household's energy consumption data and appliance usage, provide actionable tips to reduce energy consumption and lower energy bills.

  Household Size: {{householdSize}}
  Location: {{location}}
  Average Monthly Consumption: {{averageMonthlyConsumption}} kWh
  Appliance Usage:
  {{#each applianceUsage}}
  - {{key}}: {{value}} hours/day
  {{/each}}

  Provide at least 3 specific and practical energy-saving tips tailored to this household.`,
});

const personalizedEnergySavingTipsFlow = ai.defineFlow(
  {
    name: 'personalizedEnergySavingTipsFlow',
    inputSchema: PersonalizedEnergySavingTipsInputSchema,
    outputSchema: PersonalizedEnergySavingTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
