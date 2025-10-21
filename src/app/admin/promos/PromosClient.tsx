
// 'use client';

// import { useState } from "react";
// import { IPromoCode, IProduct } from "@/types";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import PromoCodeForm from "./PromoCodeForm";
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
// import { Badge } from "@/components/ui/badge";
// import { formatCurrency } from "@/lib/utils";
// import { format } from "date-fns";
// import { deletePromoCode } from "@/app/actions";

// export default function PromosClient({ initialPromos, products }: { initialPromos: IPromoCode[], products: IProduct[] }) {
//   const [promos, setPromos] = useState<IPromoCode[]>(initialPromos);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingPromo, setEditingPromo] = useState<IPromoCode | null>(null);
//   const { toast } = useToast();

//   const handleFormSuccess = (promo: IPromoCode) => {
//     if (editingPromo) {
//       setPromos(promos.map(p => p._id === promo._id ? promo : p));
//       toast({ title: 'Success', description: 'Promo code updated successfully.' });
//     } else {
//       setPromos([promo, ...promos]);
//       toast({ title: 'Success', description: 'Promo code created successfully.' });
//     }
//     setIsDialogOpen(false);
//     setEditingPromo(null);
//   };

//   const handleEdit = (promo: IPromoCode) => {
//     setEditingPromo(promo);
//     setIsDialogOpen(true);
//   };
  
//   const handleDelete = async (promoId: string) => {
//     try {
//       await deletePromoCode(promoId);
//       setPromos(promos.filter(p => p._id !== promoId));
//       toast({ title: 'Success', description: 'Promo code deleted successfully.' });
//     } catch (error) {
//       toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-end mb-4">
//         <Dialog open={isDialogOpen} onOpenChange={(open) => {
//           setIsDialogOpen(open);
//           if (!open) setEditingPromo(null);
//         }}>
//           <DialogTrigger asChild>
//             <Button>
//               <PlusCircle className="mr-2 h-4 w-4" /> Add Promo Code
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>{editingPromo ? 'Edit' : 'Add'} Promo Code</DialogTitle>
//             </DialogHeader>
//             <PromoCodeForm
//               onSuccess={handleFormSuccess}
//               promo={editingPromo}
//               products={products}
//             />
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="border rounded-lg">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Code</TableHead>
//               <TableHead>Type</TableHead>
//               <TableHead>Value</TableHead>
//               <TableHead>Expires</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Applies To</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {promos.map((promo) => (
//               <TableRow key={promo._id}>
//                 <TableCell className="font-medium font-mono">{promo.code}</TableCell>
//                 <TableCell className="capitalize">{promo.discountType}</TableCell>
//                 <TableCell>
//                   {promo.discountType === 'percentage'
//                     ? `${promo.value}%`
//                     : formatCurrency(promo.value)}
//                 </TableCell>
//                 <TableCell>
//                   {promo.expirationDate ? format(new Date(promo.expirationDate), 'dd LLL, yyyy') : 'Never'}
//                 </TableCell>
//                 <TableCell>
//                   <Badge variant={promo.isActive ? 'default' : 'secondary'}>
//                     {promo.isActive ? 'Active' : 'Inactive'}
//                   </Badge>
//                 </TableCell>
//                  <TableCell>
//                   {promo.applicableProducts && promo.applicableProducts.length > 0
//                     ? `${promo.applicableProducts.length} product(s)`
//                     : 'All Products'}
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <Button variant="ghost" size="icon" onClick={() => handleEdit(promo)}>
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
//                           This action cannot be undone. This will permanently delete the promo code.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction onClick={() => handleDelete(promo._id)}>Continue</AlertDialogAction>
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
 

// updated page 

'use client';

import { useState, useMemo } from "react";
import { IPromoCode, IProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PromoCodeForm from "./PromoCodeForm";
import { PlusCircle, Edit, Trash2, Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Percent, Gift, Calendar, Globe } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { deletePromoCode } from "@/app/actions";

export default function PromosClient({ initialPromos, products }: { initialPromos: IPromoCode[], products: IProduct[] }) {
  const [promos, setPromos] = useState<IPromoCode[]>(initialPromos);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<IPromoCode | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { toast } = useToast();

  const handleFormSuccess = (promo: IPromoCode) => {
    if (editingPromo) {
      setPromos(promos.map(p => p._id === promo._id ? promo : p));
      toast({ title: 'Success', description: 'Promo code updated successfully.' });
    } else {
      setPromos([promo, ...promos]);
      toast({ title: 'Success', description: 'Promo code created successfully.' });
    }
    setIsDialogOpen(false);
    setEditingPromo(null);
  };

  const handleEdit = (promo: IPromoCode) => {
    setEditingPromo(promo);
    setIsDialogOpen(true);
  };
  
  const handleDelete = async (promoId: string) => {
    try {
      await deletePromoCode(promoId);
      setPromos(promos.filter(p => p._id !== promoId));
      toast({ title: 'Success', description: 'Promo code deleted successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    }
  };

  const filteredPromos = promos.filter(promo =>
    promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.discountType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredPromos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPromos = filteredPromos.slice(startIndex, endIndex);

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

  // Check if promo is expired
  const isPromoExpired = (expirationDate: string | null) => {
    if (!expirationDate) return false;
    return new Date(expirationDate) < new Date();
  };

  // Get promo status with expiration check
  const getPromoStatus = (promo: IPromoCode) => {
    if (!promo.isActive) {
      return { label: "Inactive", variant: "secondary" as const, color: "bg-gray-100 text-gray-800" };
    }
    if (isPromoExpired(promo.expirationDate)) {
      return { label: "Expired", variant: "destructive" as const, color: "bg-red-100 text-red-800" };
    }
    return { label: "Active", variant: "default" as const, color: "bg-green-100 text-green-800" };
  };

  // Get discount type icon and color
  const getDiscountTypeInfo = (type: string) => {
    if (type === 'percentage') {
      return { icon: Percent, color: 'bg-orange-100 text-orange-800' };
    }
    return { icon: Gift, color: 'bg-blue-100 text-blue-800' };
  };

  const activePromos = promos.filter(p => p.isActive && !isPromoExpired(p.expirationDate));
  const expiredPromos = promos.filter(p => isPromoExpired(p.expirationDate));

  return (
    <div className="space-y-6 lg:space-y-8 p-4 lg:p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 md:p-6 lg:p-8 border border-green-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="bg-green-500 p-2 md:p-3 rounded-xl flex-shrink-0">
              <Gift className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Promo Codes</h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">Manage discounts and promotional offers</p>
            </div>
          </div>
          <div className="flex items-center justify-between lg:justify-end space-x-6">
            <div className="text-right">
              <div className="text-xl md:text-2xl font-bold text-green-600">{activePromos.length}</div>
              <div className="text-xs md:text-sm text-gray-500">Active</div>
            </div>
            <div className="text-right">
              <div className="text-xl md:text-2xl font-bold text-red-600">{expiredPromos.length}</div>
              <div className="text-xs md:text-sm text-gray-500">Expired</div>
            </div>
            <div className="text-right">
              <div className="text-xl md:text-2xl font-bold text-gray-600">{promos.length}</div>
              <div className="text-xs md:text-sm text-gray-500">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 max-w-full sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search promo codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors w-full"
              />
            </div>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) setEditingPromo(null);
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-green-600 hover:bg-green-700 flex-1 sm:flex-none">
                  <PlusCircle className="h-4 w-4" />
                  <span className="sm:hidden">Add</span>
                  <span className="hidden sm:inline">Add Promo Code</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px] mx-4">
                <DialogHeader>
                  <DialogTitle>{editingPromo ? 'Edit' : 'Add'} Promo Code</DialogTitle>
                </DialogHeader>
                <PromoCodeForm
                  onSuccess={handleFormSuccess}
                  promo={editingPromo}
                  products={products}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Promo Codes Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="font-semibold text-gray-900 py-4 min-w-[120px]">Code</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden md:table-cell">Type</TableHead>
                <TableHead className="font-semibold text-gray-900">Value</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden lg:table-cell">Expires</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden sm:table-cell">Status</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden lg:table-cell">Applies To</TableHead>
                <TableHead className="text-right font-semibold text-gray-900 min-w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPromos.map((promo, index) => {
                const promoStatus = getPromoStatus(promo);
                const discountTypeInfo = getDiscountTypeInfo(promo.discountType);
                const DiscountIcon = discountTypeInfo.icon;
                
                return (
                  <TableRow 
                    key={promo._id} 
                    className="hover:bg-green-50/30 transition-colors group border-b border-gray-100"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${discountTypeInfo.color} flex items-center justify-center flex-shrink-0`}>
                          <DiscountIcon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-mono font-semibold text-gray-900 group-hover:text-green-700 transition-colors text-sm md:text-base">
                            {promo.code}
                          </div>
                          {/* Show additional info on mobile */}
                          <div className="md:hidden mt-1 space-y-1">
                            <div className="text-xs text-gray-500 capitalize">
                              {promo.discountType} discount
                            </div>
                            <div className="sm:hidden">
                              <Badge 
                                variant={promoStatus.variant}
                                className={`${promoStatus.color} border-0 font-medium text-xs`}
                              >
                                {promoStatus.label}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            ID: {promo._id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge 
                        variant="outline" 
                        className={`${discountTypeInfo.color} border-0 capitalize`}
                      >
                        {promo.discountType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-gray-900 text-lg">
                        {promo.discountType === 'percentage'
                          ? `${promo.value}%`
                          : formatCurrency(promo.value)}
                      </div>
                      {/* Show expiration on smaller screens */}
                      <div className="lg:hidden text-xs text-gray-500 mt-1">
                        {promo.expirationDate ? (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(promo.expirationDate), 'dd MMM, yy')}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            No expiry
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="text-sm text-gray-600">
                        {promo.expirationDate ? (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>
                              {format(new Date(promo.expirationDate), 'dd LLL, yyyy')}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-green-600">
                            <Globe className="h-4 w-4" />
                            <span>Never expires</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge 
                        variant={promoStatus.variant}
                        className={`${promoStatus.color} border-0 font-medium`}
                      >
                        {promoStatus.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="text-sm text-gray-600">
                        {promo.applicableProducts && promo.applicableProducts.length > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{promo.applicableProducts.length} product{promo.applicableProducts.length !== 1 ? 's' : ''}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-green-600">
                            <Globe className="h-4 w-4" />
                            <span>All products</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(promo)}
                          className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="sm:max-w-lg mx-4">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-xl">Delete Promo Code</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-600">
                                Are you sure you want to delete the promo code "{promo.code}"? This action cannot be undone and will permanently remove the promotional offer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(promo._id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete Promo Code
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {currentPromos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-3">
                      <Gift className="h-12 w-12 text-gray-300" />
                      <div className="text-gray-500 font-medium">No promo codes found</div>
                      <div className="text-gray-400 text-sm text-center px-4">
                        {searchTerm ? 'Try adjusting your search terms' : 'Create your first promo code to boost sales'}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredPromos.length > 0 && (
          <div className="bg-gray-50/50 px-4 py-3 md:px-6 md:py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Show</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="w-20 h-8">
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
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredPromos.length)} of {filteredPromos.length} promo codes
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 px-2 lg:px-3"
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
                        className="h-8 w-8 p-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        key={index}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handlePageChange(page as number)}
                        className={`h-8 w-8 p-0 ${currentPage === page ? 'bg-green-600 hover:bg-green-700' : ''}`}
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
                  className="h-8 px-2 lg:px-3"
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