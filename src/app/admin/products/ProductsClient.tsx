// 'use client';

// import { useState } from "react";
// import Image from "next/image";
// import { ICategory, IProduct } from "@/types";
// import { formatCurrency } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { PlusCircle, Edit, Trash2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import ProductForm from "./ProductForm";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Badge } from "@/components/ui/badge";
// import { deleteProduct } from "@/app/actions";

// export default function ProductsClient({ initialProducts, categories }: { initialProducts: IProduct[], categories: ICategory[] }) {
//   const [products, setProducts] = useState<IProduct[]>(initialProducts);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
//   const { toast } = useToast();

//   const handleFormSuccess = (product: IProduct) => {
//     if (editingProduct) {
//       setProducts(products.map(p => p._id === product._id ? product : p));
//       toast({ title: 'Success', description: 'Product updated successfully.' });
//     } else {
//       setProducts([product, ...products]);
//       toast({ title: 'Success', description: 'Product created successfully.' });
//     }
//     setIsDialogOpen(false);
//     setEditingProduct(null);
//   };

//   const handleEdit = (product: IProduct) => {
//     setEditingProduct(product);
//     setIsDialogOpen(true);
//   };

//   const handleDelete = async (productId: string) => {
//     try {
//       await deleteProduct(productId);
//       setProducts(products.filter(p => p._id !== productId));
//       toast({ title: 'Success', description: 'Product deleted successfully.' });
//     } catch (error) {
//       toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-end mb-4">
//         <Dialog open={isDialogOpen} onOpenChange={(open) => {
//           setIsDialogOpen(open);
//           if (!open) setEditingProduct(null);
//         }}>
//           <DialogTrigger asChild>
//             <Button>
//               <PlusCircle className="mr-2 h-4 w-4" /> Add Product
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[625px]">
//             <DialogHeader>
//               <DialogTitle>{editingProduct ? 'Edit' : 'Add'} Product</DialogTitle>
//             </DialogHeader>
//             <ProductForm
//               onSuccess={handleFormSuccess}
//               product={editingProduct}
//               categories={categories}
//             />
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="border rounded-lg">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Image</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead>Stock</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {products.map((product) => (
//               <TableRow key={product._id}>
//                 <TableCell>
//                   <Image src={product.imageUrls?.[0] || 'https://placehold.co/40x40.png'} alt={product.name} width={40} height={40} className="rounded-md" data-ai-hint="product image" />
//                 </TableCell>
//                 <TableCell className="font-medium">{product.name}</TableCell>
//                 <TableCell>
//                   <Badge variant="outline">{product.category?.name || 'N/A'}</Badge>
//                 </TableCell>
//                 <TableCell>{formatCurrency(product.price)}</TableCell>
//                 <TableCell>{product.stock}</TableCell>
//                 <TableCell className="text-right">
//                   <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                    <AlertDialog>
//                     <AlertDialogTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <Trash2 className="h-4 w-4 text-destructive" />
//                       </Button>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent>
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                         <AlertDialogDescription>
//                           This action cannot be undone. This will permanently delete the product.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction onClick={() => handleDelete(product._id)}>Continue</AlertDialogAction>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   );
// }



// upddate 
// 'use client';

// import { useState } from "react";
// import Image from "next/image";
// import { ICategory, IProduct } from "@/types";
// import { formatCurrency } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { PlusCircle, Edit, Trash2, Package, Search, Filter } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import ProductForm from "./ProductForm";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { deleteProduct } from "@/app/actions";

// export default function ProductsClient({ initialProducts, categories }: { initialProducts: IProduct[], categories: ICategory[] }) {
//   const [products, setProducts] = useState<IProduct[]>(initialProducts);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();

//   const handleFormSuccess = (product: IProduct) => {
//     if (editingProduct) {
//       setProducts(products.map(p => p._id === product._id ? product : p));
//       toast({ title: 'Success', description: 'Product updated successfully.' });
//     } else {
//       setProducts([product, ...products]);
//       toast({ title: 'Success', description: 'Product created successfully.' });
//     }
//     setIsDialogOpen(false);
//     setEditingProduct(null);
//   };

//   const handleEdit = (product: IProduct) => {
//     setEditingProduct(product);
//     setIsDialogOpen(true);
//   };

//   const handleDelete = async (productId: string) => {
//     try {
//       await deleteProduct(productId);
//       setProducts(products.filter(p => p._id !== productId));
//       toast({ title: 'Success', description: 'Product deleted successfully.' });
//     } catch (error) {
//       toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
//     }
//   };

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getStockStatus = (stock: number) => {
//     if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const, color: "bg-red-100 text-red-800" };
//     if (stock < 50) return { label: "Low Stock", variant: "secondary" as const, color: "bg-amber-100 text-amber-800" };
//     return { label: "In Stock", variant: "default" as const, color: "bg-emerald-100 text-emerald-800" };
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="bg-blue-500 p-3 rounded-xl">
//               <Package className="h-8 w-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Product Inventory</h1>
//               <p className="text-gray-600 mt-1">Manage your product catalog and inventory</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <div className="text-right">
//               <div className="text-2xl font-bold text-blue-600">{products.length}</div>
//               <div className="text-sm text-gray-500">Total Products</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Actions and Search Bar */}
//       <div className="bg-white rounded-xl shadow-sm border p-6">
//         <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
//           <div className="flex-1 max-w-md">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
//               />
//             </div>
//           </div>

//           <div className="flex gap-3">
//             <Button variant="outline" size="sm" className="gap-2">
//               <Filter className="h-4 w-4" />
//               Filter
//             </Button>
//             <Dialog open={isDialogOpen} onOpenChange={(open) => {
//               setIsDialogOpen(open);
//               if (!open) setEditingProduct(null);
//             }}>
//               <DialogTrigger asChild>
//                 <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
//                   <PlusCircle className="h-4 w-4" />
//                   Add Product
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[625px]">
//                 <DialogHeader>
//                   <DialogTitle>{editingProduct ? 'Edit' : 'Add'} Product</DialogTitle>
//                 </DialogHeader>
//                 <ProductForm
//                   onSuccess={handleFormSuccess}
//                   product={editingProduct}
//                   categories={categories}
//                 />
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
//               <TableHead className="font-semibold text-gray-900 py-4">Product</TableHead>
//               <TableHead className="font-semibold text-gray-900">Category</TableHead>
//               <TableHead className="font-semibold text-gray-900">Price</TableHead>
//               <TableHead className="font-semibold text-gray-900">Stock Status</TableHead>
//               <TableHead className="font-semibold text-gray-900">Quantity</TableHead>
//               <TableHead className="text-right font-semibold text-gray-900">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredProducts.map((product, index) => {
//               const stockStatus = getStockStatus(product.stock);
//               return (
//                 <TableRow 
//                   key={product._id} 
//                   className="hover:bg-blue-50/30 transition-colors group border-b border-gray-100"
//                 >
//                   <TableCell className="py-4">
//                     <div className="flex items-center space-x-4">
//                       <div className="relative">
//                         <Image 
//                           src={product.imageUrls?.[0] || 'https://placehold.co/48x48.png'} 
//                           alt={product.name} 
//                           width={48} 
//                           height={48} 
//                           className="rounded-lg object-cover border-2 border-gray-100 group-hover:border-blue-200 transition-colors" 
//                         />
//                         {product.stock === 0 && (
//                           <div className="absolute inset-0 bg-gray-900/20 rounded-lg flex items-center justify-center">
//                             <div className="text-xs text-white font-medium bg-red-500 px-1 py-0.5 rounded">OUT</div>
//                           </div>
//                         )}
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
//                           {product.name}
//                         </div>
//                         <div className="text-sm text-gray-500 mt-0.5">
//                           ID: {product._id.slice(-8)}
//                         </div>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge 
//                       variant="outline" 
//                       className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors"
//                     >
//                       {product.category?.name || 'N/A'}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="font-semibold text-gray-900 text-lg">
//                       {formatCurrency(product.price)}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge 
//                       variant={stockStatus.variant}
//                       className={`${stockStatus.color} border-0 font-medium`}
//                     >
//                       {stockStatus.label}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       <span className={`font-semibold ${product.stock < 50 ? 'text-amber-600' : 'text-gray-900'}`}>
//                         {product.stock}
//                       </span>
//                       <span className="text-sm text-gray-500">units</span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end space-x-1">
//                       <Button 
//                         variant="ghost" 
//                         size="sm" 
//                         onClick={() => handleEdit(product)}
//                         className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-all"
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <AlertDialog>
//                         <AlertDialogTrigger asChild>
//                           <Button 
//                             variant="ghost" 
//                             size="sm"
//                             className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-all"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </AlertDialogTrigger>
//                         <AlertDialogContent className="sm:max-w-lg">
//                           <AlertDialogHeader>
//                             <AlertDialogTitle className="text-xl">Delete Product</AlertDialogTitle>
//                             <AlertDialogDescription className="text-gray-600">
//                               Are you sure you want to delete "{product.name}"? This action cannot be undone and will permanently remove the product from your inventory.
//                             </AlertDialogDescription>
//                           </AlertDialogHeader>
//                           <AlertDialogFooter>
//                             <AlertDialogCancel>Cancel</AlertDialogCancel>
//                             <AlertDialogAction 
//                               onClick={() => handleDelete(product._id)}
//                               className="bg-red-600 hover:bg-red-700"
//                             >
//                               Delete Product
//                             </AlertDialogAction>
//                           </AlertDialogFooter>
//                         </AlertDialogContent>
//                       </AlertDialog>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//             {filteredProducts.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center py-12">
//                   <div className="flex flex-col items-center space-y-3">
//                     <Package className="h-12 w-12 text-gray-300" />
//                     <div className="text-gray-500 font-medium">No products found</div>
//                     <div className="text-gray-400 text-sm">
//                       {searchTerm ? 'Try adjusting your search terms' : 'Add your first product to get started'}
//                     </div>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useState, useMemo } from "react";
// import Image from "next/image";
// import { ICategory, IProduct } from "@/types";
// import { formatCurrency } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { PlusCircle, Edit, Trash2, Package, Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import ProductForm from "./ProductForm";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { deleteProduct } from "@/app/actions";

// export default function ProductsClient({ initialProducts, categories }: { initialProducts: IProduct[], categories: ICategory[] }) {
//   const [products, setProducts] = useState<IProduct[]>(initialProducts);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const { toast } = useToast();

//   const handleFormSuccess = (product: IProduct) => {
//     if (editingProduct) {
//       setProducts(products.map(p => p._id === product._id ? product : p));
//       toast({ title: 'Success', description: 'Product updated successfully.' });
//     } else {
//       setProducts([product, ...products]);
//       toast({ title: 'Success', description: 'Product created successfully.' });
//     }
//     setIsDialogOpen(false);
//     setEditingProduct(null);
//   };

//   const handleEdit = (product: IProduct) => {
//     setEditingProduct(product);
//     setIsDialogOpen(true);
//   };

//   const handleDelete = async (productId: string) => {
//     try {
//       await deleteProduct(productId);
//       setProducts(products.filter(p => p._id !== productId));
//       toast({ title: 'Success', description: 'Product deleted successfully.' });
//     } catch (error) {
//       toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
//     }
//   };

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentProducts = filteredProducts.slice(startIndex, endIndex);

//   // Reset to first page when search changes
//   useMemo(() => {
//     setCurrentPage(1);
//   }, [searchTerm]);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;

//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 4; i++) pages.push(i);
//         pages.push('...');
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1);
//         pages.push('...');
//         for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
//       } else {
//         pages.push(1);
//         pages.push('...');
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
//         pages.push('...');
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   const getStockStatus = (stock: number) => {
//     if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const, color: "bg-red-100 text-red-800" };
//     if (stock < 50) return { label: "Low Stock", variant: "secondary" as const, color: "bg-amber-100 text-amber-800" };
//     return { label: "In Stock", variant: "default" as const, color: "bg-emerald-100 text-emerald-800" };
//   };

//   return (
//     <div className="space-y-6 lg:space-y-8 p-4 lg:p-6">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 md:p-6 lg:p-8 border border-blue-100">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
//           <div className="flex items-center space-x-3 md:space-x-4">
//             <div className="bg-blue-500 p-2 md:p-3 rounded-xl flex-shrink-0">
//               <Package className="h-6 w-6 md:h-8 md:w-8 text-white" />
//             </div>
//             <div className="min-w-0 flex-1">
//               <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Product Inventory</h1>
//               <p className="text-sm md:text-base text-gray-600 mt-1">Manage your product catalog and inventory</p>
//             </div>
//           </div>
//           <div className="flex items-center justify-between lg:justify-end space-x-6">
//             <div className="text-right">
//               <div className="text-xl md:text-2xl font-bold text-blue-600">{products.length}</div>
//               <div className="text-xs md:text-sm text-gray-500">Total Products</div>
//             </div>
            
//           </div>
//         </div>
//       </div>

//       {/* Actions and Search Bar */}
//       <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
//         <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
//           <div className="flex-1 max-w-full sm:max-w-md">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors w-full"
//               />
//             </div>
//           </div>

//           <div className="flex gap-3 w-full sm:w-auto">
           
//             <Dialog open={isDialogOpen} onOpenChange={(open) => {
//               setIsDialogOpen(open);
//               if (!open) setEditingProduct(null);
//             }}>
//               <DialogTrigger asChild>
//                 <Button className="gap-2 bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none">
//                   <PlusCircle className="h-4 w-4" />
//                   <span className="sm:hidden">Add</span>
//                   <span className="hidden sm:inline">Add Product</span>
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[625px] mx-4">
//                 <DialogHeader>
//                   <DialogTitle>{editingProduct ? 'Edit' : 'Add'} Product</DialogTitle>
//                 </DialogHeader>
//                 <ProductForm
//                   onSuccess={handleFormSuccess}
//                   product={editingProduct}
//                   categories={categories}
//                 />
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
//                 <TableHead className="font-semibold text-gray-900 py-4 min-w-[200px]">Product</TableHead>
//                 <TableHead className="font-semibold text-gray-900 hidden md:table-cell">Category</TableHead>
//                 <TableHead className="font-semibold text-gray-900">Price</TableHead>
//                 <TableHead className="font-semibold text-gray-900 hidden lg:table-cell">Stock Status</TableHead>
//                 <TableHead className="font-semibold text-gray-900 hidden sm:table-cell">Quantity</TableHead>
//                 <TableHead className="text-right font-semibold text-gray-900 min-w-[100px]">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {currentProducts.map((product) => {
//                 const stockStatus = getStockStatus(product.stock);
//                 return (
//                   <TableRow
//                     key={product._id}
//                     className="hover:bg-blue-50/30 transition-colors group border-b border-gray-100"
//                   >
//                     <TableCell className="py-4">
//                       <div className="flex items-center space-x-3 md:space-x-4">
//                         <div className="relative flex-shrink-0">
//                           <Image
//                             src={product.imageUrls?.[0] || 'https://placehold.co/48x48.png'}
//                             alt={product.name}
//                             width={48}
//                             height={48}
//                             className="rounded-lg object-cover border-2 border-gray-100 group-hover:border-blue-200 transition-colors"
//                           />
//                           {product.stock === 0 && (
//                             <div className="absolute inset-0 bg-gray-900/20 rounded-lg flex items-center justify-center">
//                               <div className="text-xs text-white font-medium bg-red-500 px-1 py-0.5 rounded">OUT</div>
//                             </div>
//                           )}
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors truncate">
//                             {product.name}
//                           </div>
//                           <div className="text-sm text-gray-500 mt-0.5 md:hidden">
//                             <Badge
//                               variant="outline"
//                               className="bg-purple-50 text-purple-700 border-purple-200 text-xs"
//                             >
//                               {product.category?.name || 'N/A'}
//                             </Badge>
//                           </div>
//                           <div className="text-xs text-gray-400 mt-1">
//                             ID: {product._id.slice(-8)}
//                           </div>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell">
//                       <Badge
//                         variant="outline"
//                         className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors"
//                       >
//                         {product.category?.name || 'N/A'}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="font-semibold text-gray-900 text-base lg:text-lg">
//                         {formatCurrency(product.price)}
//                       </div>
//                       <div className="lg:hidden mt-1">
//                         <Badge
//                           variant={stockStatus.variant}
//                           className={`${stockStatus.color} border-0 font-medium text-xs`}
//                         >
//                           {stockStatus.label}
//                         </Badge>
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden lg:table-cell">
//                       <Badge
//                         variant={stockStatus.variant}
//                         className={`${stockStatus.color} border-0 font-medium`}
//                       >
//                         {stockStatus.label}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="hidden sm:table-cell">
//                       <div className="flex items-center space-x-2">
//                         <span className={`font-semibold ${product.stock < 50 ? 'text-amber-600' : 'text-gray-900'}`}>
//                           {product.stock}
//                         </span>
//                         <span className="text-sm text-gray-500 hidden md:inline">units</span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <div className="flex justify-end space-x-1">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => handleEdit(product)}
//                           className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <AlertDialog>
//                           <AlertDialogTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
//                             >
//                               <Trash2 className="h-4 w-4" />
//                             </Button>
//                           </AlertDialogTrigger>
//                           <AlertDialogContent className="sm:max-w-lg mx-4">
//                             <AlertDialogHeader>
//                               <AlertDialogTitle className="text-xl">Delete Product</AlertDialogTitle>
//                               <AlertDialogDescription className="text-gray-600">
//                                 Are you sure you want to delete "{product.name}"? This action cannot be undone and will permanently remove the product from your inventory.
//                               </AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                               <AlertDialogCancel>Cancel</AlertDialogCancel>
//                               <AlertDialogAction
//                                 onClick={() => handleDelete(product._id)}
//                                 className="bg-red-600 hover:bg-red-700"
//                               >
//                                 Delete Product
//                               </AlertDialogAction>
//                             </AlertDialogFooter>
//                           </AlertDialogContent>
//                         </AlertDialog>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//               {currentProducts.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center py-12">
//                     <div className="flex flex-col items-center space-y-3">
//                       <Package className="h-12 w-12 text-gray-300" />
//                       <div className="text-gray-500 font-medium">No products found</div>
//                       <div className="text-gray-400 text-sm text-center px-4">
//                         {searchTerm ? 'Try adjusting your search terms' : 'Add your first product to get started'}
//                       </div>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         {filteredProducts.length > 0 && (
//           <div className="bg-gray-50/50 px-4 py-3 md:px-6 md:py-4 border-t border-gray-200">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-700">Show</span>
//                   <Select value={itemsPerPage.toString()} onValueChange={(value) => {
//                     setItemsPerPage(Number(value));
//                     setCurrentPage(1);
//                   }}>
//                     <SelectTrigger className="w-20 h-8">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="5">5</SelectItem>
//                       <SelectItem value="10">10</SelectItem>
//                       <SelectItem value="20">20</SelectItem>
//                       <SelectItem value="50">50</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <span className="text-sm text-gray-700">per page</span>
//                 </div>
//                 <div className="text-sm text-gray-700">
//                   Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="h-8 px-2 lg:px-3"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                   <span className="hidden sm:inline ml-1">Previous</span>
//                 </Button>

//                 <div className="hidden sm:flex items-center gap-1">
//                   {getPageNumbers().map((page, index) => (
//                     page === '...' ? (
//                       <Button
//                         key={index}
//                         variant="ghost"
//                         size="sm"
//                         disabled
//                         className="h-8 w-8 p-0"
//                       >
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     ) : (
//                       <Button
//                         key={index}
//                         variant={currentPage === page ? "default" : "ghost"}
//                         size="sm"
//                         onClick={() => handlePageChange(page as number)}
//                         className={`h-8 w-8 p-0 ${currentPage === page ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
//                       >
//                         {page}
//                       </Button>
//                     )
//                   ))}
//                 </div>

//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="h-8 px-2 lg:px-3"
//                 >
//                   <span className="hidden sm:inline mr-1">Next</span>
//                   <ChevronRight className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useMemo } from "react";
import Image from "next/image";
import { ICategory, IProduct } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Edit, Trash2, Package, Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductForm from "./ProductForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { deleteProduct } from "@/app/actions";

export default function ProductsClient({ initialProducts, categories }: { initialProducts: IProduct[], categories: ICategory[] }) {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormSuccess = (product: IProduct) => {
    if (editingProduct) {
      setProducts(products.map(p => p._id === product._id ? product : p));
      toast({ title: 'Success', description: 'Product updated successfully.' });
    } else {
      setProducts([product, ...products]);
      toast({ title: 'Success', description: 'Product created successfully.' });
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: IProduct) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(p => p._id !== productId));
      toast({ title: 'Success', description: 'Product deleted successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const, color: "bg-red-100 text-red-800" };
    if (stock < 50) return { label: "Low Stock", variant: "secondary" as const, color: "bg-amber-100 text-amber-800" };
    return { label: "In Stock", variant: "default" as const, color: "bg-emerald-100 text-emerald-800" };
  };

  return (
    <div className="space-y-6 p-2 sm:p-4 lg:p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-2 sm:p-4 lg:p-6 border border-blue-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 sm:p-3 rounded-xl flex-shrink-0">
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Product Inventory</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your product catalog and inventory</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">{products.length}</div>
            <div className="text-xs sm:text-sm text-gray-500">Total Products</div>
          </div>
          <div className="text-right hidden lg:block">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600">
              {products.filter(p => p.stock > 0).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">In Stock</div>
          </div>
          <div className="text-right hidden lg:block">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-amber-600">
              {products.filter(p => p.stock < 50 && p.stock > 0).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">Low Stock</div>
          </div>
        </div>
      </div>

      {/* Actions and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border p-2 sm:p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors w-full text-lg"
              />
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="h-11 gap-2 flex-1 sm:flex-none">
              <Filter className="h-4 w-4" />
              <span className="sm:hidden">Filter</span>
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) setEditingProduct(null);
            }}>
              <DialogTrigger asChild>
                <Button className="h-11 gap-2 bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none">
                  <PlusCircle className="h-4 w-4" />
                  <span className="sm:hidden">Add</span>
                  <span className="hidden sm:inline">Add Product</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px] mx-2">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? 'Edit' : 'Add'} Product</DialogTitle>
                </DialogHeader>
                <ProductForm
                  onSuccess={handleFormSuccess}
                  product={editingProduct}
                  categories={categories}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Mobile: Card Layout */}
      <div className="space-y-4 sm:hidden">
        {currentProducts.map((product) => {
          const stockStatus = getStockStatus(product.stock);
          return (
            <div key={product._id} className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={product.imageUrls?.[0] || 'https://placehold.co/48x48.png'}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover border-2 border-gray-100"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PC9zdmc+"
                    />
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-gray-900/20 rounded-lg flex items-center justify-center">
                        <div className="text-xs text-white font-medium bg-red-500 px-1 py-0.5 rounded">OUT</div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 truncate">{product.name}</div>
                    <div className="text-xs text-gray-400">ID: {product._id.slice(-8)}</div>
                  </div>
                </div>
                <Badge className={`${stockStatus.color} font-medium`}>{stockStatus.label}</Badge>
              </div>
              <div className="mt-2 text-lg font-semibold text-gray-900">{formatCurrency(product.price)}</div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full h-11 text-lg"
                onClick={() => setExpandedProduct(expandedProduct === product._id ? null : product._id)}
              >
                {expandedProduct === product._id ? 'Collapse' : 'Expand'}
              </Button>
              {expandedProduct === product._id && (
                <div className="mt-3 space-y-2">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Category:</span>{' '}
                    {product.category?.name || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Quantity:</span>{' '}
                    {product.stock} units
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-11 flex-1"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="h-11 flex-1">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="sm:max-w-lg mx-2">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-xl">Delete Product</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-600">
                            Are you sure you want to delete "{product.name}"? This action cannot be undone and will permanently remove the product from your inventory.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete Product
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {currentProducts.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <Package className="h-12 w-12 text-gray-300 mx-auto" />
            <div className="text-gray-500 font-medium mt-2">No products found</div>
            <div className="text-gray-400 text-sm mt-1">
              {searchTerm ? 'Try adjusting your search terms' : 'Add your first product to get started'}
            </div>
          </div>
        )}
      </div>

      {/* Tablet/Desktop: Table Layout */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden hidden sm:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="font-semibold text-gray-900 py-4 min-w-[200px] text-lg">Product</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden md:table-cell min-w-[150px] text-lg">Category</TableHead>
                <TableHead className="font-semibold text-gray-900 min-w-[120px] text-lg">Price</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden lg:table-cell min-w-[120px] text-lg">Stock Status</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden sm:table-cell min-w-[100px] text-lg">Quantity</TableHead>
                <TableHead className="text-right font-semibold text-gray-900 min-w-[100px] text-lg">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <TableRow
                    key={product._id}
                    className="hover:bg-blue-50/30 transition-colors group border-b border-gray-100"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative flex-shrink-0">
                          <Image
                            src={product.imageUrls?.[0] || 'https://placehold.co/48x48.png'}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="rounded-lg object-cover border-2 border-gray-100 group-hover:border-blue-200 transition-colors"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PC9zdmc+"
                          />
                          {product.stock === 0 && (
                            <div className="absolute inset-0 bg-gray-900/20 rounded-lg flex items-center justify-center">
                              <div className="text-xs text-white font-medium bg-red-500 px-1 py-0.5 rounded">OUT</div>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors truncate text-lg">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            ID: {product._id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors"
                      >
                        {product.category?.name || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-gray-900 text-lg">
                        {formatCurrency(product.price)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge
                        variant={stockStatus.variant}
                        className={`${stockStatus.color} border-0 font-medium`}
                      >
                        {stockStatus.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${product.stock < 50 ? 'text-amber-600' : 'text-gray-900'}`}>
                          {product.stock}
                        </span>
                        <span className="text-sm text-gray-500 hidden md:inline">units</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(product)}
                          className="h-11 w-11 p-0 hover:bg-blue-100 hover:text-blue-700 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-11 w-11 p-0 hover:bg-red-100 hover:text-red-700 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="sm:max-w-lg mx-2">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-xl">Delete Product</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-600">
                                Are you sure you want to delete "{product.name}"? This action cannot be undone and will permanently remove the product from your inventory.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(product._id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete Product
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {currentProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-3">
                      <Package className="h-12 w-12 text-gray-300" />
                      <div className="text-gray-500 font-medium">No products found</div>
                      <div className="text-gray-400 text-sm text-center px-4">
                        {searchTerm ? 'Try adjusting your search terms' : 'Add your first product to get started'}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="bg-gray-50/50 px-2 sm:px-4 lg:px-6 py-3 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Show</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="w-20 h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-700">per page</span>
                </div>
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-11 px-2 sm:px-3"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Previous</span>
                </Button>
                <div className="hidden sm:flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        disabled
                        className="h-11 w-11 p-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        key={index}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handlePageChange(page as number)}
                        className={`h-11 w-11 p-0 ${currentPage === page ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      >
                        {page}
                      </Button>
                    )
                  ))}
                </div>
                <div className="sm:hidden text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-11 px-2 sm:px-3"
                >
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}