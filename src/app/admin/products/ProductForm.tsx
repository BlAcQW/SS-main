
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ICategory, IProduct } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Trash2 } from 'lucide-react';
import { createProduct, updateProduct } from '@/app/actions';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0.'),
  stock: z.coerce.number().min(0, 'Stock cannot be negative.'),
  category: z.string().min(1, 'Category is required.'),
  imageUrls: z.array(z.string().url()).min(1, 'At least one image is required.'),
});

interface ProductFormProps {
  onSuccess: (product: IProduct) => void;
  product?: IProduct | null;
  categories: ICategory[];
}

export default function ProductForm({ onSuccess, product, categories }: ProductFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      stock: product?.stock || 0,
      category:
        typeof product?.category === 'object'
          ? String((product?.category as any)?._id ?? '')
          : String(product?.category ?? ''),
      imageUrls: product?.imageUrls || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'imageUrls',
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || `Upload failed for ${file.name}`);
        }

        const data = await res.json();
        if (data.url) {
          append(data.url);
        } else {
          throw new Error('Upload response did not contain a URL.');
        }
      }
      toast({ title: 'Success', description: 'Images uploaded successfully.' });
    } catch (error) {
      console.error('Image upload error:', error);
      toast({
        title: 'Error',
        description: (error as Error).message || 'Image upload failed',
        variant: 'destructive',
      });
    } finally {
      if (event.target) event.target.value = '';
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const savedProduct = product
        ? await updateProduct(product._id, values)
        : await createProduct(values);
      
      onSuccess(savedProduct);
      
    } catch (error) {
        toast({
          title: 'Error',
          description: (error as Error).message || 'Failed to save product. Please try again.',
          variant: 'destructive',
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl><Input placeholder="e.g., Wireless Headphones" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="Product details..." {...field} rows={5} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="imageUrls"
              render={() => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                   <Button
                    type="button"
                    variant="outline"
                    asChild
                    disabled={isUploading}
                    className="mt-2 w-full"
                  >
                    <label className="cursor-pointer flex items-center justify-center gap-2">
                      {isUploading
                        ? <Loader2 className="h-4 w-4 animate-spin" />
                        : <Upload className="h-4 w-4" />}
                      <span>Upload Image</span>
                      <Input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                        accept="image/*"
                        disabled={isUploading}
                      />
                    </label>
                  </Button>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="relative aspect-square w-full">
                        {field.value && (
                          <Image
                            src={field.value}
                            alt={`Product image ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 33vw, 100px"
                            className="object-contain rounded-md border"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PC9zdmc+"
                          />
                        )}
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="99.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading || isUploading}>
          {(isLoading || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? 'Update' : 'Create'} Product
        </Button>
      </form>
    </Form>
  );
}
