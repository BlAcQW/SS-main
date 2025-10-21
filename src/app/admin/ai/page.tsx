'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  generateProductDescription,
  GenerateProductDescriptionInput,
  GenerateProductDescriptionOutput,
} from '@/ai/flows/generate-product-description';
import {
  generateCategoryDescription,
  GenerateCategoryDescriptionInput,
  GenerateCategoryDescriptionOutput,
} from '@/ai/flows/generate-category-description';
import {
  generatePromotionalContent,
  GeneratePromotionalContentInput,
  GeneratePromotionalContentOutput,
} from '@/ai/flows/generate-promotional-content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

const productSchema = z.object({
  productName: z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
  keyFeatures: z.string().min(1, 'Required'),
  targetAudience: z.string().min(1, 'Required'),
});

const categorySchema = z.object({
  categoryName: z.string().min(1, 'Required'),
  keywords: z.string().min(1, 'Required'),
});

const promoSchema = z.object({
  productName: z.string().min(1, 'Required'),
  productDescription: z.string().min(1, 'Required'),
  targetAudience: z.string().min(1, 'Required'),
  campaignGoal: z.string().min(1, 'Required'),
});

export default function AiToolsPage() {
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const productForm = useForm<z.infer<typeof productSchema>>({ resolver: zodResolver(productSchema) });
  const categoryForm = useForm<z.infer<typeof categorySchema>>({ resolver: zodResolver(categorySchema) });
  const promoForm = useForm<z.infer<typeof promoSchema>>({ resolver: zodResolver(promoSchema) });

  const handleGenerate = async (type: 'product' | 'category' | 'promo', data: any) => {
    setIsLoading(true);
    setGeneratedContent('');
    try {
      let content = '';
      if (type === 'product') {
        const result = await generateProductDescription(data as GenerateProductDescriptionInput);
        content = result.description;
      } else if (type === 'category') {
        const result = await generateCategoryDescription(data as GenerateCategoryDescriptionInput);
        content = result.description;
      } else {
        const result = await generatePromotionalContent(data as GeneratePromotionalContentInput);
        content = result.promotionalContent;
      }
      setGeneratedContent(content);
      toast({ title: 'Success', description: 'Content generated successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to generate content.', variant: 'destructive' });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">AI Content Generator</h1>
      <Tabs defaultValue="product" className="w-full">
        <TabsList>
          <TabsTrigger value="product">Product Description</TabsTrigger>
          <TabsTrigger value="category">Category Description</TabsTrigger>
          <TabsTrigger value="promo">Promotional Content</TabsTrigger>
        </TabsList>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Details</CardTitle>
            </CardHeader>
            <CardContent>
              <TabsContent value="product">
                <Form {...productForm}>
                  <form onSubmit={productForm.handleSubmit((data) => handleGenerate('product', data))} className="space-y-4">
                    <FormField control={productForm.control} name="productName" render={({ field }) => ( <FormItem><FormLabel>Product Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={productForm.control} name="category" render={({ field }) => ( <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={productForm.control} name="keyFeatures" render={({ field }) => ( <FormItem><FormLabel>Key Features</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={productForm.control} name="targetAudience" render={({ field }) => ( <FormItem><FormLabel>Target Audience</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <Button type="submit" disabled={isLoading}><Wand2 className="mr-2 h-4 w-4" /> Generate</Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="category">
                <Form {...categoryForm}>
                   <form onSubmit={categoryForm.handleSubmit((data) => handleGenerate('category', data))} className="space-y-4">
                    <FormField control={categoryForm.control} name="categoryName" render={({ field }) => ( <FormItem><FormLabel>Category Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={categoryForm.control} name="keywords" render={({ field }) => ( <FormItem><FormLabel>Keywords (comma separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <Button type="submit" disabled={isLoading}><Wand2 className="mr-2 h-4 w-4" /> Generate</Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="promo">
                <Form {...promoForm}>
                  <form onSubmit={promoForm.handleSubmit((data) => handleGenerate('promo', data))} className="space-y-4">
                    <FormField control={promoForm.control} name="productName" render={({ field }) => ( <FormItem><FormLabel>Product Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={promoForm.control} name="productDescription" render={({ field }) => ( <FormItem><FormLabel>Product Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={promoForm.control} name="targetAudience" render={({ field }) => ( <FormItem><FormLabel>Target Audience</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={promoForm.control} name="campaignGoal" render={({ field }) => ( <FormItem><FormLabel>Campaign Goal</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <Button type="submit" disabled={isLoading}><Wand2 className="mr-2 h-4 w-4" /> Generate</Button>
                  </form>
                </Form>
              </TabsContent>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>Review and copy the AI-generated content.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[300px] border-dashed border-2 p-4 rounded-md">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <Textarea
                  readOnly
                  value={generatedContent}
                  className="w-full h-full resize-none border-none focus-visible:ring-0"
                  rows={15}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
}
