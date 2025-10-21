// 'use client';

// import { useState } from "react";
// import { ICategory } from "@/types";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import CategoryForm from "./CategoryForm";
// import { PlusCircle, Edit, Trash2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
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
// } from "@/components/ui/alert-dialog"
// import { deleteCategory } from "@/app/actions";

// export default function CategoriesClient({ initialCategories }: { initialCategories: ICategory[] }) {
//   const [categories, setCategories] = useState<ICategory[]>(initialCategories);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);
//   const { toast } = useToast();

//   const handleFormSuccess = (category: ICategory) => {
//     if (editingCategory) {
//       setCategories(categories.map(c => c._id === category._id ? category : c));
//       toast({ title: 'Success', description: 'Category updated successfully.' });
//     } else {
//       setCategories([category, ...categories]);
//       toast({ title: 'Success', description: 'Category created successfully.' });
//     }
//     setIsDialogOpen(false);
//     setEditingCategory(null);
//   };

//   const handleEdit = (category: ICategory) => {
//     setEditingCategory(category);
//     setIsDialogOpen(true);
//   };
  
//   const handleDelete = async (categoryId: string) => {
//     try {
//       await deleteCategory(categoryId);
//       setCategories(categories.filter(c => c._id !== categoryId));
//       toast({ title: 'Success', description: 'Category deleted successfully.' });
//     } catch (error) {
//       toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-end mb-4">
//         <Dialog open={isDialogOpen} onOpenChange={(open) => {
//           setIsDialogOpen(open);
//           if (!open) setEditingCategory(null);
//         }}>
//           <DialogTrigger asChild>
//             <Button>
//               <PlusCircle className="mr-2 h-4 w-4" /> Add Category
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>{editingCategory ? 'Edit' : 'Add'} Category</DialogTitle>
//             </DialogHeader>
//             <CategoryForm
//               onSuccess={handleFormSuccess}
//               category={editingCategory}
//             />
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="border rounded-lg">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Description</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {categories.map((category) => (
//               <TableRow key={category._id}>
//                 <TableCell className="font-medium">{category.name}</TableCell>
//                 <TableCell>{category.description}</TableCell>
//                 <TableCell className="text-right">
//                   <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                   <AlertDialog>
//                     <AlertDialogTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <Trash2 className="h-4 w-4 text-destructive" />
//                       </Button>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent>
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                         <AlertDialogDescription>
//                           This action cannot be undone. This will permanently delete the category.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction onClick={() => handleDelete(category._id)}>Continue</AlertDialogAction>
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


//upated  
// 'use client';

// import { useState, useMemo } from "react";
// import { ICategory } from "@/types";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import CategoryForm from "./CategoryForm";
// import { PlusCircle, Edit, Trash2, Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Tag, Layers } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
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
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { deleteCategory } from "@/app/actions";

// export default function CategoriesClient({ initialCategories }: { initialCategories: ICategory[] }) {
//   const [categories, setCategories] = useState<ICategory[]>(initialCategories);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const { toast } = useToast();

//   const handleFormSuccess = (category: ICategory) => {
//     if (editingCategory) {
//       setCategories(categories.map(c => c._id === category._id ? category : c));
//       toast({ title: 'Success', description: 'Category updated successfully.' });
//     } else {
//       setCategories([category, ...categories]);
//       toast({ title: 'Success', description: 'Category created successfully.' });
//     }
//     setIsDialogOpen(false);
//     setEditingCategory(null);
//   };

//   const handleEdit = (category: ICategory) => {
//     setEditingCategory(category);
//     setIsDialogOpen(true);
//   };
  
//   const handleDelete = async (categoryId: string) => {
//     try {
//       await deleteCategory(categoryId);
//       setCategories(categories.filter(c => c._id !== categoryId));
//       toast({ title: 'Success', description: 'Category deleted successfully.' });
//     } catch (error) {
//       toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
//     }
//   };

//   const filteredCategories = categories.filter(category =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     category.description?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentCategories = filteredCategories.slice(startIndex, endIndex);

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

//   // Generate color for category based on name
//   const getCategoryColor = (name: string) => {
//     const colors = [
//       'bg-blue-100 text-blue-800',
//       'bg-purple-100 text-purple-800',
//       'bg-green-100 text-green-800',
//       'bg-yellow-100 text-yellow-800',
//       'bg-pink-100 text-pink-800',
//       'bg-indigo-100 text-indigo-800',
//       'bg-red-100 text-red-800',
//       'bg-orange-100 text-orange-800'
//     ];
//     const index = name.length % colors.length;
//     return colors[index];
//   };

//   return (
//     <div className="space-y-6 lg:space-y-8 p-4 lg:p-6">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 md:p-6 lg:p-8 border border-purple-100">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
//           <div className="flex items-center space-x-3 md:space-x-4">
//             <div className="bg-purple-500 p-2 md:p-3 rounded-xl flex-shrink-0">
//               <Layers className="h-6 w-6 md:h-8 md:w-8 text-white" />
//             </div>
//             <div className="min-w-0 flex-1">
//               <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Category Management</h1>
//               <p className="text-sm md:text-base text-gray-600 mt-1">Organize your products with categories</p>
//             </div>
//           </div>
//           <div className="flex items-center justify-between lg:justify-end space-x-6">
//             <div className="text-right">
//               <div className="text-xl md:text-2xl font-bold text-purple-600">{categories.length}</div>
//               <div className="text-xs md:text-sm text-gray-500">Total Categories</div>
//             </div>
//             <div className="text-right">
//               <div className="text-xl md:text-2xl font-bold text-green-600">{categories.filter(c => c.name).length}</div>
//               <div className="text-xs md:text-sm text-gray-500">Active</div>
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
//                 placeholder="Search categories..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors w-full"
//               />
//             </div>
//           </div>
          
//           <div className="flex gap-3 w-full sm:w-auto">
//             <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
//               <Filter className="h-4 w-4" />
//               <span className="hidden sm:inline">Filter</span>
//             </Button>
//             <Dialog open={isDialogOpen} onOpenChange={(open) => {
//               setIsDialogOpen(open);
//               if (!open) setEditingCategory(null);
//             }}>
//               <DialogTrigger asChild>
//                 <Button className="gap-2 bg-purple-600 hover:bg-purple-700 flex-1 sm:flex-none">
//                   <PlusCircle className="h-4 w-4" />
//                   <span className="sm:hidden">Add</span>
//                   <span className="hidden sm:inline">Add Category</span>
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[625px] mx-4">
//                 <DialogHeader>
//                   <DialogTitle>{editingCategory ? 'Edit' : 'Add'} Category</DialogTitle>
//                 </DialogHeader>
//                 <CategoryForm
//                   onSuccess={handleFormSuccess}
//                   category={editingCategory}
//                 />
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </div>

//       {/* Categories Table */}
//       <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
//                 <TableHead className="font-semibold text-gray-900 py-4 min-w-[200px]">Category</TableHead>
//                 <TableHead className="font-semibold text-gray-900 hidden md:table-cell min-w-[300px]">Description</TableHead>
//                 <TableHead className="font-semibold text-gray-900 hidden sm:table-cell">Created</TableHead>
//                 <TableHead className="text-right font-semibold text-gray-900 min-w-[100px]">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {currentCategories.map((category, index) => (
//                 <TableRow 
//                   key={category._id} 
//                   className="hover:bg-purple-50/30 transition-colors group border-b border-gray-100"
//                 >
//                   <TableCell className="py-4">
//                     <div className="flex items-center space-x-3 md:space-x-4">
//                       <div className="flex-shrink-0">
//                         <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${getCategoryColor(category.name)} flex items-center justify-center`}>
//                           <Tag className="h-5 w-5 md:h-6 md:w-6" />
//                         </div>
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors text-base md:text-lg">
//                           {category.name}
//                         </div>
//                         <div className="text-xs text-gray-400 mt-1">
//                           ID: {category._id.slice(-8)}
//                         </div>
//                         {/* Show description on mobile */}
//                         <div className="md:hidden mt-2 text-sm text-gray-600">
//                           {category.description && category.description.length > 50 
//                             ? `${category.description.substring(0, 50)}...` 
//                             : category.description || 'No description'}
//                         </div>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell className="hidden md:table-cell">
//                     <div className="text-gray-700 leading-relaxed">
//                       {category.description || (
//                         <span className="text-gray-400 italic">No description provided</span>
//                       )}
//                     </div>
//                   </TableCell>
//                   <TableCell className="hidden sm:table-cell">
//                     <div className="text-sm text-gray-500">
//                       {category.createdAt 
//                         ? new Date(category.createdAt).toLocaleDateString('en-US', {
//                             year: 'numeric',
//                             month: 'short',
//                             day: 'numeric'
//                           })
//                         : 'Unknown'
//                       }
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end space-x-1">
//                       <Button 
//                         variant="ghost" 
//                         size="sm" 
//                         onClick={() => handleEdit(category)}
//                         className="h-8 w-8 p-0 hover:bg-purple-100 hover:text-purple-700 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <AlertDialog>
//                         <AlertDialogTrigger asChild>
//                           <Button 
//                             variant="ghost" 
//                             size="sm"
//                             className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </AlertDialogTrigger>
//                         <AlertDialogContent className="sm:max-w-lg mx-4">
//                           <AlertDialogHeader>
//                             <AlertDialogTitle className="text-xl">Delete Category</AlertDialogTitle>
//                             <AlertDialogDescription className="text-gray-600">
//                               Are you sure you want to delete "{category.name}"? This action cannot be undone and may affect products assigned to this category.
//                             </AlertDialogDescription>
//                           </AlertDialogHeader>
//                           <AlertDialogFooter>
//                             <AlertDialogCancel>Cancel</AlertDialogCancel>
//                             <AlertDialogAction 
//                               onClick={() => handleDelete(category._id)}
//                               className="bg-red-600 hover:bg-red-700"
//                             >
//                               Delete Category
//                             </AlertDialogAction>
//                           </AlertDialogFooter>
//                         </AlertDialogContent>
//                       </AlertDialog>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {currentCategories.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={4} className="text-center py-12">
//                     <div className="flex flex-col items-center space-y-3">
//                       <Layers className="h-12 w-12 text-gray-300" />
//                       <div className="text-gray-500 font-medium">No categories found</div>
//                       <div className="text-gray-400 text-sm text-center px-4">
//                         {searchTerm ? 'Try adjusting your search terms' : 'Add your first category to get started'}
//                       </div>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         {filteredCategories.length > 0 && (
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
//                   Showing {startIndex + 1}-{Math.min(endIndex, filteredCategories.length)} of {filteredCategories.length} categories
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
//                         className={`h-8 w-8 p-0 ${currentPage === page ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
//                       >
//                         {page}
//                       </Button>
//                     )
//                   ))}
//                 </div>

//                 <div className="sm:hidden text-sm text-gray-600">
//                   Page {currentPage} of {totalPages}
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
import { ICategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CategoryForm from "./CategoryForm";
import { PlusCircle, Edit, Trash2, Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Tag, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { deleteCategory } from "@/app/actions";

export default function CategoriesClient({ initialCategories }: { initialCategories: ICategory[] }) {
  const [categories, setCategories] = useState<ICategory[]>(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormSuccess = (category: ICategory) => {
    if (editingCategory) {
      setCategories(categories.map(c => c._id === category._id ? category : c));
      toast({ title: 'Success', description: 'Category updated successfully.' });
    } else {
      setCategories([category, ...categories]);
      toast({ title: 'Success', description: 'Category created successfully.' });
    }
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      setCategories(categories.filter(c => c._id !== categoryId));
      toast({ title: 'Success', description: 'Category deleted successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

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

  // Generate color for category based on name
  const getCategoryColor = (name: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-purple-100 text-purple-800',
      'bg-green-100 text-green-800',
      'bg-yellow-100 text-yellow-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-red-100 text-red-800',
      'bg-orange-100 text-orange-800'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="space-y-6 p-2 sm:p-4 lg:p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-2 sm:p-4 lg:p-6 border border-purple-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500 p-2 sm:p-3 rounded-xl flex-shrink-0">
              <Layers className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Category Management</h1>
              <p className="text-sm text-gray-600 mt-1">Organize your products with categories</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-xs sm:text-sm text-gray-500">Total Categories</div>
          </div>
          <div className="text-right hidden lg:block">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600">{categories.filter(c => c.name).length}</div>
            <div className="text-xs sm:text-sm text-gray-500">Active</div>
          </div>
          <div className="text-right hidden lg:block">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">{categories.length}</div>
            <div className="text-xs sm:text-sm text-gray-500">Total Products</div>
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
                placeholder="Search categories..."
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
              if (!open) setEditingCategory(null);
            }}>
              <DialogTrigger asChild>
                <Button className="h-11 gap-2 bg-purple-600 hover:bg-purple-700 flex-1 sm:flex-none">
                  <PlusCircle className="h-4 w-4" />
                  <span className="sm:hidden">Add</span>
                  <span className="hidden sm:inline">Add Category</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px] mx-2">
                <DialogHeader>
                  <DialogTitle>{editingCategory ? 'Edit' : 'Add'} Category</DialogTitle>
                </DialogHeader>
                <CategoryForm
                  onSuccess={handleFormSuccess}
                  category={editingCategory}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Mobile: Card Layout */}
      <div className="space-y-4 sm:hidden">
        {currentCategories.map((category) => (
          <div key={category._id} className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl ${getCategoryColor(category.name)} flex items-center justify-center`}>
                  <Tag className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">{category.name}</div>
                  <div className="text-xs text-gray-400">ID: {category._id.slice(-8)}</div>
                </div>
              </div>
              <Badge className={category.name ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                {category.name ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full h-11 text-lg"
              onClick={() => setExpandedCategory(expandedCategory === category._id ? null : category._id)}
            >
              {expandedCategory === category._id ? 'Collapse' : 'Expand'}
            </Button>
            {expandedCategory === category._id && (
              <div className="mt-3 space-y-2">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Description:</span>{' '}
                  {category.description || 'No description provided'}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Created:</span>{' '}
                  {category.createdAt
                    ? new Date(category.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'Unknown'}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-11 flex-1"
                    onClick={() => handleEdit(category)}
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
                        <AlertDialogTitle className="text-xl">Delete Category</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600">
                          Are you sure you want to delete "{category.name}"? This action cannot be undone and may affect products assigned to this category.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(category._id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete Category
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </div>
        ))}
        {currentCategories.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <Layers className="h-12 w-12 text-gray-300 mx-auto" />
            <div className="text-gray-500 font-medium mt-2">No categories found</div>
            <div className="text-gray-400 text-sm mt-1">
              {searchTerm ? 'Try adjusting your search terms' : 'Add your first category to get started'}
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
                <TableHead className="font-semibold text-gray-900 py-4 min-w-[200px] text-lg">Category</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden md:table-cell min-w-[300px] text-lg">Description</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden sm:table-cell text-lg">Created</TableHead>
                <TableHead className="text-right font-semibold text-gray-900 min-w-[100px] text-lg">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCategories.map((category) => (
                <TableRow
                  key={category._id}
                  className="hover:bg-purple-50/30 transition-colors group border-b border-gray-100"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl ${getCategoryColor(category.name)} flex items-center justify-center`}>
                        <Tag className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors text-lg">
                          {category.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          ID: {category._id.slice(-8)}
                        </div>
                      </div>
                      <Badge className={category.name ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {category.name ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableHead className="hidden md:table-cell">
                    <div className="text-gray-700 leading-relaxed text-base">
                      {category.description && category.description.length > 100
                        ? `${category.description.substring(0, 100)}...`
                        : category.description || (
                            <span className="text-gray-400 italic">No description provided</span>
                          )}
                    </div>
                  </TableHead>
                  <TableCell className="hidden sm:table-cell">
                    <div className="text-sm text-gray-500">
                      {category.createdAt
                        ? new Date(category.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : 'Unknown'}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(category)}
                        className="h-11 w-11 p-0 hover:bg-purple-100 hover:text-purple-700 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
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
                            <AlertDialogTitle className="text-xl">Delete Category</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600">
                              Are you sure you want to delete "{category.name}"? This action cannot be undone and may affect products assigned to this category.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(category._id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Category
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {currentCategories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-3">
                      <Layers className="h-12 w-12 text-gray-300" />
                      <div className="text-gray-500 font-medium">No categories found</div>
                      <div className="text-gray-400 text-sm text-center px-4">
                        {searchTerm ? 'Try adjusting your search terms' : 'Add your first category to get started'}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredCategories.length > 0 && (
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
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredCategories.length)} of {filteredCategories.length} categories
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
                        className={`h-11 w-11 p-0 ${currentPage === page ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
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