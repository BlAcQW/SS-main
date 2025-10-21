'use server';

/**
 * @fileOverview AI-powered category description generator.
 *
 * - generateCategoryDescription - A function that generates a category description.
 * - GenerateCategoryDescriptionInput - The input type for the generateCategoryDescription function.
 * - GenerateCategoryDescriptionOutput - The return type for the generateCategoryDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCategoryDescriptionInputSchema = z.object({
  categoryName: z.string().describe('The name of the category.'),
  keywords: z.string().describe('Keywords related to the category.'),
});
export type GenerateCategoryDescriptionInput = z.infer<
  typeof GenerateCategoryDescriptionInputSchema
>;

const GenerateCategoryDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated description for the category.'),
});
export type GenerateCategoryDescriptionOutput = z.infer<
  typeof GenerateCategoryDescriptionOutputSchema
>;

export async function generateCategoryDescription(
  input: GenerateCategoryDescriptionInput
): Promise<GenerateCategoryDescriptionOutput> {
  return generateCategoryDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCategoryDescriptionPrompt',
  input: {schema: GenerateCategoryDescriptionInputSchema},
  output: {schema: GenerateCategoryDescriptionOutputSchema},
  prompt: `You are an e-commerce expert specializing in writing engaging and informative category descriptions.

  Based on the category name and provided keywords, generate a compelling description for the category.

  Category Name: {{{categoryName}}}
  Keywords: {{{keywords}}}

  Description:`,
});

const generateCategoryDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCategoryDescriptionFlow',
    inputSchema: GenerateCategoryDescriptionInputSchema,
    outputSchema: GenerateCategoryDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
