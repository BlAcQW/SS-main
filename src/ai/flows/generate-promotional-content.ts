'use server';
/**
 * @fileOverview Generates promotional content for products using AI.
 *
 * - generatePromotionalContent - A function that handles the generation of promotional content.
 * - GeneratePromotionalContentInput - The input type for the generatePromotionalContent function.
 * - GeneratePromotionalContentOutput - The return type for the generatePromotionalContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromotionalContentInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productDescription: z.string().describe('A detailed description of the product.'),
  targetAudience: z.string().describe('The target audience for the product.'),
  campaignGoal: z.string().describe('The goal of the promotional campaign (e.g., increase sales, brand awareness).'),
});
export type GeneratePromotionalContentInput = z.infer<typeof GeneratePromotionalContentInputSchema>;

const GeneratePromotionalContentOutputSchema = z.object({
  promotionalContent: z.string().describe('The generated promotional content for the product.'),
});
export type GeneratePromotionalContentOutput = z.infer<typeof GeneratePromotionalContentOutputSchema>;

export async function generatePromotionalContent(input: GeneratePromotionalContentInput): Promise<GeneratePromotionalContentOutput> {
  return generatePromotionalContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePromotionalContentPrompt',
  input: {schema: GeneratePromotionalContentInputSchema},
  output: {schema: GeneratePromotionalContentOutputSchema},
  prompt: `You are an AI-powered marketing assistant specializing in crafting compelling promotional content.

  Based on the product details and campaign goals, generate engaging promotional content tailored to the target audience.

  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}
  Target Audience: {{{targetAudience}}}
  Campaign Goal: {{{campaignGoal}}}

  Promotional Content:`,
});

const generatePromotionalContentFlow = ai.defineFlow(
  {
    name: 'generatePromotionalContentFlow',
    inputSchema: GeneratePromotionalContentInputSchema,
    outputSchema: GeneratePromotionalContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
