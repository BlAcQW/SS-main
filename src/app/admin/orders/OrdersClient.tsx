// 'use client';
// import * as React from 'react';
// import { IOrder } from "@/types";
// import { formatCurrency } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { updateOrderStatus } from "@/app/actions";
// import { useToast } from "@/hooks/use-toast";
// import { cva } from "class-variance-authority";
// import { ChevronDown, ChevronUp, Trash2, Download } from "lucide-react";
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
// import { format } from 'date-fns';
// import { deleteOrder } from '@/app/actions';

// const statusVariants = cva(
//   "capitalize",
//   {
//     variants: {
//       status: {
//         pending: "bg-yellow-100 text-yellow-800",
//         processing: "bg-blue-100 text-blue-800",
//         shipped: "bg-indigo-100 text-indigo-800",
//         delivered: "bg-green-100 text-green-800",
//         cancelled: "bg-red-100 text-red-800",
//       },
//     },
//     defaultVariants: {
//       status: "pending",
//     },
//   }
// )

// export default function OrdersClient({ initialOrders }: { initialOrders: IOrder[] }) {
//   const [orders, setOrders] = React.useState<IOrder[]>(initialOrders);
//   const [openOrderId, setOpenOrderId] = React.useState<string | null>(null);
//   const { toast } = useToast();

//   const handleStatusChange = async (orderId: string, status: IOrder['status']) => {
//     try {
//       const updatedOrder = await updateOrderStatus(orderId, status);
//       setOrders(orders.map(o => o._id === updatedOrder._id ? updatedOrder : o));
//       toast({ title: "Success", description: "Order status updated." });
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
//     }
//   };

//   const handleDelete = async (orderId: string) => {
//     try {
//       await deleteOrder(orderId);
//       setOrders(orders.filter(o => o._id !== orderId));
//       toast({ title: 'Success', description: 'Order deleted successfully.' });
//     } catch (error) {
//       toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
//     }
//   };
  
//   const toggleRow = (orderId: string) => {
//     setOpenOrderId(openOrderId === orderId ? null : orderId);
//   }

//   const downloadOrdersAsCSV = () => {
//     const headers = [
//       "Order ID", "Date", "Customer Name", "Customer Email", "Customer WhatsApp",
//       "Location", "Total Amount", "Payment Method", "Payment Status", "Order Status", "Items"
//     ];
    
//     const rows = orders.map(order => {
//       const items = order.items.map(item => 
//         `${item.quantity}x ${item.product?.name || 'N/A'}`
//       ).join('; ');

//       return [
//         order._id,
//         order.createdAt ? new Date(order.createdAt).toISOString() : 'N/A',
//         `"${order.customerName}"`,
//         order.customerEmail,
//         order.customerWhatsapp,
//         `"${order.customerLocation}"`,
//         order.totalAmount,
//         order.paymentMethod,
//         order.paymentStatus,
//         order.status,
//         `"${items}"`
//       ].join(',');
//     });

//     const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "orders.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }

//   return (
//     <>
//     <div className="flex justify-end mb-4">
//         <Button onClick={downloadOrdersAsCSV}>
//           <Download className="mr-2 h-4 w-4" /> Download Orders
//         </Button>
//     </div>
//     <div className="border rounded-lg">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[50px]"></TableHead>
//             <TableHead>Order ID</TableHead>
//             <TableHead>Customer</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead>Total</TableHead>
//             <TableHead>Payment</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {orders.map((order) => (
//             <React.Fragment key={order._id}>
//                <TableRow>
//                   <TableCell>
//                      <Button
//                         onClick={() => toggleRow(order._id)}
//                         variant="ghost"
//                         size="icon"
//                         className="transition-transform"
//                       >
//                        {openOrderId === order._id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                      </Button>
//                   </TableCell>
//                   <TableCell className="font-mono text-xs">
//                     {order._id}
//                   </TableCell>
//                   <TableCell className="font-medium">
//                     <div>
//                       <p>{order.customerName}</p>
//                       <p className="text-sm text-muted-foreground">{order.customerWhatsapp}</p>
//                     </div>
//                   </TableCell>
//                   <TableCell>{order.createdAt ? format(new Date(order.createdAt), 'dd LLL, yyyy') : 'N/A'}</TableCell>
//                   <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
//                   <TableCell>
//                     <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'} className="capitalize bg-green-100 text-green-800">
//                       {order.paymentStatus}
//                     </Badge>
//                     <span className="ml-2 text-xs capitalize text-muted-foreground">({order.paymentMethod})</span>
//                   </TableCell>
//                   <TableCell>
//                     <Select value={order.status} onValueChange={(value) => handleStatusChange(order._id, value as IOrder['status'])}>
//                       <SelectTrigger className="w-[120px]">
//                         <SelectValue>
//                            <Badge className={statusVariants({ status: order.status })}>{order.status}</Badge>
//                         </SelectValue>
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="pending">Pending</SelectItem>
//                         <SelectItem value="processing">Processing</SelectItem>
//                         <SelectItem value="shipped">Shipped</SelectItem>
//                         <SelectItem value="delivered">Delivered</SelectItem>
//                         <SelectItem value="cancelled">Cancelled</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <AlertDialog>
//                       <AlertDialogTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <Trash2 className="h-4 w-4 text-destructive" />
//                         </Button>
//                       </AlertDialogTrigger>
//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                           <AlertDialogDescription>
//                             This action cannot be undone. This will permanently delete the order. Deleting an order does not restock items.
//                           </AlertDialogDescription>
//                         </AlertDialogHeader>
//                         <AlertDialogFooter>
//                           <AlertDialogCancel>Cancel</AlertDialogCancel>
//                           <AlertDialogAction onClick={() => handleDelete(order._id)}>Continue</AlertDialogAction>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>
//                   </TableCell>
//                 </TableRow>
//                 {openOrderId === order._id && (
//                    <TableRow>
//                     <TableCell colSpan={8} className="p-0">
//                         <div className="p-4 bg-muted/50">
//                           <h4 className="font-semibold mb-2">Order Items:</h4>
//                           <ul className="list-disc pl-5">
//                             {order.items.map((item, index) => (
//                               <li key={index}>
//                                 {item.product?.name || 'Product not found'} - {item.quantity} x {formatCurrency(item.price)}
//                               </li>
//                             ))}
//                           </ul>
//                           <p className="mt-2 text-sm text-muted-foreground"><b>Address:</b> {order.customerLocation}</p>
//                         </div>
//                     </TableCell>
//                   </TableRow>
//                 )}
//             </React.Fragment>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//     </>
//   );
// }


//update
// 'use client';
// import * as React from 'react';
// import { useState, useMemo } from "react";
// import { IOrder } from "@/types";
// import { formatCurrency } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { updateOrderStatus } from "@/app/actions";
// import { useToast } from "@/hooks/use-toast";
// import { cva } from "class-variance-authority";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   Trash2, 
//   Download, 
//   Search, 
//   Filter, 
//   ChevronLeft, 
//   ChevronRight, 
//   MoreHorizontal, 
//   ShoppingBag,
//   User,
//   Phone,
//   MapPin,
//   CreditCard
// } from "lucide-react";
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
// import { format } from 'date-fns';
// import { deleteOrder } from '@/app/actions';

// const statusVariants = cva(
//   "capitalize font-medium border-0",
//   {
//     variants: {
//       status: {
//         pending: "bg-yellow-100 text-yellow-800",
//         processing: "bg-blue-100 text-blue-800",
//         shipped: "bg-indigo-100 text-indigo-800",
//         delivered: "bg-green-100 text-green-800",
//         cancelled: "bg-red-100 text-red-800",
//       },
//     },
//     defaultVariants: {
//       status: "pending",
//     },
//   }
// );

// export default function OrdersClient({ initialOrders }: { initialOrders: IOrder[] }) {
//   const [orders, setOrders] = React.useState<IOrder[]>(initialOrders);
//   const [openOrderId, setOpenOrderId] = React.useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const { toast } = useToast();

//   const handleStatusChange = async (orderId: string, status: IOrder['status']) => {
//     try {
//       const updatedOrder = await updateOrderStatus(orderId, status);
//       setOrders(orders.map(o => o._id === updatedOrder._id ? updatedOrder : o));
//       toast({ title: "Success", description: "Order status updated." });
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
//     }
//   };

//   const handleDelete = async (orderId: string) => {
//     try {
//       await deleteOrder(orderId);
//       setOrders(orders.filter(o => o._id !== orderId));
//       toast({ title: 'Success', description: 'Order deleted successfully.' });
//     } catch (error) {
//       toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
//     }
//   };
  
//   const toggleRow = (orderId: string) => {
//     setOpenOrderId(openOrderId === orderId ? null : orderId);
//   };

//   const filteredOrders = orders.filter(order =>
//     order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentOrders = filteredOrders.slice(startIndex, endIndex);

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

//   const downloadOrdersAsCSV = () => {
//     const headers = [
//       "Order ID", "Date", "Customer Name", "Customer Email", "Customer WhatsApp",
//       "Location", "Total Amount", "Payment Method", "Payment Status", "Order Status", "Items"
//     ];
    
//     const rows = orders.map(order => {
//       const items = order.items.map(item => 
//         `${item.quantity}x ${item.product?.name || 'N/A'}`
//       ).join('; ');

//       return [
//         order._id,
//         order.createdAt ? new Date(order.createdAt).toISOString() : 'N/A',
//         `"${order.customerName}"`,
//         order.customerEmail,
//         order.customerWhatsapp,
//         `"${order.customerLocation}"`,
//         order.totalAmount,
//         order.paymentMethod,
//         order.paymentStatus,
//         order.status,
//         `"${items}"`
//       ].join(',');
//     });

//     const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "orders.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Calculate order statistics
//   const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
//   const paidOrders = orders.filter(order => order.paymentStatus === 'paid');
//   const pendingOrders = orders.filter(order => order.status === 'pending');
//   const deliveredOrders = orders.filter(order => order.status === 'delivered');

//   return (
//     <div className="space-y-6 lg:space-y-8 p-4 lg:p-6">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 md:p-6 lg:p-8 border border-orange-100">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
//           <div className="flex items-center space-x-3 md:space-x-4">
//             <div className="bg-orange-500 p-2 md:p-3 rounded-xl flex-shrink-0">
//               <ShoppingBag className="h-6 w-6 md:h-8 md:w-8 text-white" />
//             </div>
//             <div className="min-w-0 flex-1">
//               <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Order Management</h1>
//               <p className="text-sm md:text-base text-gray-600 mt-1">Track and manage customer orders</p>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 lg:flex lg:items-center lg:justify-end gap-4 lg:gap-6">
//             <div className="text-right">
//               <div className="text-lg md:text-xl font-bold text-orange-600">{orders.length}</div>
//               <div className="text-xs md:text-sm text-gray-500">Total Orders</div>
//             </div>
//             <div className="text-right">
//               <div className="text-lg md:text-xl font-bold text-blue-600">{pendingOrders.length}</div>
//               <div className="text-xs md:text-sm text-gray-500">Pending</div>
//             </div>
//             <div className="text-right">
//               <div className="text-lg md:text-xl font-bold text-green-600">{deliveredOrders.length}</div>
//               <div className="text-xs md:text-sm text-gray-500">Delivered</div>
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
//                 placeholder="Search orders..."
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
//             <Button onClick={downloadOrdersAsCSV} className="gap-2 bg-orange-600 hover:bg-orange-700 flex-1 sm:flex-none">
//               <Download className="h-4 w-4" />
//               <span className="sm:hidden">Export</span>
//               <span className="hidden sm:inline">Download Orders</span>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
//                 <TableHead className="w-[50px] font-semibold text-gray-900"></TableHead>
//                 <TableHead className="font-semibold text-gray-900 min-w-[140px]">Order</TableHead>
//                 <TableHead className="font-semibold text-gray-900 min-w-[180px]">Customer</TableHead>
//                 <TableHead className="font-semibold text-gray-900 hidden md:table-cell">Date</TableHead>
//                 <TableHead className="font-semibold text-gray-900">Total</TableHead>
//                 <TableHead className="font-semibold text-gray-900 hidden lg:table-cell">Payment</TableHead>
//                 <TableHead className="font-semibold text-gray-900 hidden sm:table-cell">Status</TableHead>
//                 <TableHead className="text-right font-semibold text-gray-900 min-w-[100px]">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {currentOrders.map((order) => (
//                 <React.Fragment key={order._id}>
//                   <TableRow className="hover:bg-orange-50/30 transition-colors group border-b border-gray-100">
//                     <TableCell>
//                       <Button
//                         onClick={() => toggleRow(order._id)}
//                         variant="ghost"
//                         size="sm"
//                         className="h-8 w-8 p-0 transition-transform hover:bg-orange-100"
//                       >
//                         {openOrderId === order._id ? 
//                           <ChevronUp className="h-4 w-4" /> : 
//                           <ChevronDown className="h-4 w-4" />
//                         }
//                       </Button>
//                     </TableCell>
//                     <TableCell>
//                       <div className="space-y-1">
//                         <div className="font-mono text-sm text-gray-900 group-hover:text-orange-700 transition-colors">
//                           #{order._id.slice(-8)}
//                         </div>
//                         <div className="flex items-center gap-1 text-xs text-gray-500">
//                           <ShoppingBag className="h-3 w-3" />
//                           {order.items.length} item{order.items.length !== 1 ? 's' : ''}
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-2">
//                           <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
//                           <span className="font-medium text-gray-900 truncate">{order.customerName}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm text-gray-500">
//                           <Phone className="h-3 w-3 flex-shrink-0" />
//                           <span className="truncate">{order.customerWhatsapp}</span>
//                         </div>
//                         {/* Show additional info on mobile */}
//                         <div className="md:hidden mt-2 text-xs text-gray-500">
//                           {order.createdAt ? format(new Date(order.createdAt), 'dd MMM, yyyy') : 'N/A'}
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell">
//                       <div className="text-sm text-gray-600">
//                         {order.createdAt ? format(new Date(order.createdAt), 'dd LLL, yyyy') : 'N/A'}
//                       </div>
//                       <div className="text-xs text-gray-400 mt-1">
//                         {order.createdAt ? format(new Date(order.createdAt), 'HH:mm') : ''}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="font-bold text-gray-900 text-lg">
//                         {formatCurrency(order.totalAmount)}
//                       </div>
//                       {/* Show payment info on smaller screens */}
//                       <div className="lg:hidden mt-1">
//                         <Badge 
//                           variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'} 
//                           className={`text-xs ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} border-0`}
//                         >
//                           {order.paymentStatus}
//                         </Badge>
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden lg:table-cell">
//                       <div className="space-y-1">
//                         <Badge 
//                           variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'} 
//                           className={`${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} border-0 font-medium`}
//                         >
//                           {order.paymentStatus}
//                         </Badge>
//                         <div className="flex items-center gap-1 text-xs text-gray-500 capitalize">
//                           <CreditCard className="h-3 w-3" />
//                           {order.paymentMethod}
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden sm:table-cell">
//                       <Select value={order.status} onValueChange={(value) => handleStatusChange(order._id, value as IOrder['status'])}>
//                         <SelectTrigger className="w-[130px] h-8">
//                           <SelectValue>
//                             <Badge className={statusVariants({ status: order.status })}>{order.status}</Badge>
//                           </SelectValue>
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="pending">Pending</SelectItem>
//                           <SelectItem value="processing">Processing</SelectItem>
//                           <SelectItem value="shipped">Shipped</SelectItem>
//                           <SelectItem value="delivered">Delivered</SelectItem>
//                           <SelectItem value="cancelled">Cancelled</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <div className="flex justify-end space-x-1">
//                         {/* Mobile status selector */}
//                         <div className="sm:hidden">
//                           <Select value={order.status} onValueChange={(value) => handleStatusChange(order._id, value as IOrder['status'])}>
//                             <SelectTrigger className="w-8 h-8 p-0 border-0">
//                               <Badge className={`${statusVariants({ status: order.status })} text-xs px-1`}>
//                                 {order.status.charAt(0).toUpperCase()}
//                               </Badge>
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="pending">Pending</SelectItem>
//                               <SelectItem value="processing">Processing</SelectItem>
//                               <SelectItem value="shipped">Shipped</SelectItem>
//                               <SelectItem value="delivered">Delivered</SelectItem>
//                               <SelectItem value="cancelled">Cancelled</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </div>
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
//                               <AlertDialogTitle className="text-xl">Delete Order</AlertDialogTitle>
//                               <AlertDialogDescription className="text-gray-600">
//                                 Are you sure you want to delete order #{order._id.slice(-8)}? This action cannot be undone and will permanently remove the order. Deleting an order does not restock items.
//                               </AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                               <AlertDialogCancel>Cancel</AlertDialogCancel>
//                               <AlertDialogAction 
//                                 onClick={() => handleDelete(order._id)}
//                                 className="bg-red-600 hover:bg-red-700"
//                               >
//                                 Delete Order
//                               </AlertDialogAction>
//                             </AlertDialogFooter>
//                           </AlertDialogContent>
//                         </AlertDialog>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                   {openOrderId === order._id && (
//                     <TableRow>
//                       <TableCell colSpan={8} className="p-0">
//                         <div className="p-4 md:p-6 bg-orange-50/50 border-t border-orange-100">
//                           <div className="grid md:grid-cols-2 gap-6">
//                             {/* Order Items */}
//                             <div>
//                               <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                                 <ShoppingBag className="h-4 w-4" />
//                                 Order Items
//                               </h4>
//                               <div className="space-y-2">
//                                 {order.items.map((item, index) => (
//                                   <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-orange-100">
//                                     <div className="flex-1">
//                                       <div className="font-medium text-gray-900">
//                                         {item.product?.name || 'Product not found'}
//                                       </div>
//                                       <div className="text-sm text-gray-500">
//                                         Quantity: {item.quantity}
//                                       </div>
//                                     </div>
//                                     <div className="font-semibold text-gray-900">
//                                       {formatCurrency(item.price)}
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
                            
//                             {/* Customer Information */}
//                             <div>
//                               <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                                 <User className="h-4 w-4" />
//                                 Customer Details
//                               </h4>
//                               <div className="space-y-3 bg-white p-4 rounded-lg border border-orange-100">
//                                 <div className="flex items-start gap-3">
//                                   <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                                   <div className="flex-1">
//                                     <div className="text-sm font-medium text-gray-900">Delivery Address</div>
//                                     <div className="text-sm text-gray-600 mt-1">{order.customerLocation}</div>
//                                   </div>
//                                 </div>
//                                 {order.customerEmail && (
//                                   <div className="flex items-center gap-3">
//                                     <div className="h-4 w-4 text-gray-400 flex items-center justify-center">
//                                       @
//                                     </div>
//                                     <div className="text-sm text-gray-600">{order.customerEmail}</div>
//                                   </div>
//                                 )}
//                                 <div className="flex items-center gap-3">
//                                   <Phone className="h-4 w-4 text-gray-400" />
//                                   <div className="text-sm text-gray-600">{order.customerWhatsapp}</div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </React.Fragment>
//               ))}
//               {currentOrders.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={8} className="text-center py-12">
//                     <div className="flex flex-col items-center space-y-3">
//                       <ShoppingBag className="h-12 w-12 text-gray-300" />
//                       <div className="text-gray-500 font-medium">No orders found</div>
//                       <div className="text-gray-400 text-sm text-center px-4">
//                         {searchTerm ? 'Try adjusting your search terms' : 'Orders will appear here when customers make purchases'}
//                       </div>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         {filteredOrders.length > 0 && (
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
//                   Showing {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
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
//                         className={`h-8 w-8 p-0 ${currentPage === page ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
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
import * as React from 'react';
import { useState, useMemo } from "react";
import { IOrder } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { updateOrderStatus } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { cva } from "class-variance-authority";
import { 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Download, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  ShoppingBag,
  User,
  Phone,
  MapPin,
  CreditCard
} from "lucide-react";
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
import { format } from 'date-fns';
import { deleteOrder } from '@/app/actions';

const statusVariants = cva(
  "capitalize font-medium border-0",
  {
    variants: {
      status: {
        pending: "bg-yellow-100 text-yellow-800",
        processing: "bg-blue-100 text-blue-800",
        shipped: "bg-indigo-100 text-indigo-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

export default function OrdersClient({ initialOrders }: { initialOrders: IOrder[] }) {
  const [orders, setOrders] = React.useState<IOrder[]>(initialOrders);
  const [openOrderId, setOpenOrderId] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { toast } = useToast();

  const handleStatusChange = async (orderId: string, status: IOrder['status']) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      setOrders(orders.map(o => o._id === updatedOrder._id ? updatedOrder : o));
      toast({ title: "Success", description: "Order status updated." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    }
  };

  const handleDelete = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter(o => o._id !== orderId));
      toast({ title: 'Success', description: 'Order deleted successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: (error as Error).message, variant: 'destructive' });
    }
  };
  
  const toggleRow = (orderId: string) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

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

  const downloadOrdersAsCSV = () => {
    const headers = [
      "Order ID", "Date", "Customer Name", "Customer Email", "Customer WhatsApp",
      "Location", "Total Amount", "Payment Method", "Payment Status", "Order Status", "Items"
    ];
    
    const rows = orders.map(order => {
      const items = order.items.map(item => 
        `${item.quantity}x ${item.product?.name || 'N/A'}`
      ).join('; ');

      return [
        order._id,
        order.createdAt ? new Date(order.createdAt).toISOString() : 'N/A',
        `"${order.customerName}"`,
        order.customerEmail,
        order.customerWhatsapp,
        `"${order.customerLocation}"`,
        order.totalAmount,
        order.paymentMethod,
        order.paymentStatus,
        order.status,
        `"${items}"`
      ].join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate order statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const paidOrders = orders.filter(order => order.paymentStatus === 'paid');
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const deliveredOrders = orders.filter(order => order.status === 'delivered');

  return (
    <div className="space-y-4 lg:space-y-6 p-2 sm:p-4 lg:p-6 max-w-full overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg lg:rounded-xl p-3 sm:p-4 md:p-6 border border-orange-100">
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500 p-2 md:p-3 rounded-lg lg:rounded-xl flex-shrink-0">
              <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">Track and manage customer orders</p>
            </div>
          </div>
          {/* Stats Grid - Always 2x2 on mobile, responsive on larger screens */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <div className="text-base sm:text-lg md:text-xl font-bold text-orange-600">{orders.length}</div>
              <div className="text-xs sm:text-sm text-gray-500">Total Orders</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-base sm:text-lg md:text-xl font-bold text-blue-600">{pendingOrders.length}</div>
              <div className="text-xs sm:text-sm text-gray-500">Pending</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-base sm:text-lg md:text-xl font-bold text-green-600">{deliveredOrders.length}</div>
              <div className="text-xs sm:text-sm text-gray-500">Delivered</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-base sm:text-lg md:text-xl font-bold text-purple-600">{formatCurrency(totalRevenue)}</div>
              <div className="text-xs sm:text-sm text-gray-500">Total Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions and Search Bar */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-3 sm:p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-between sm:items-center">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors w-full h-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none h-10 px-3">
              <Filter className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Filter</span>
            </Button>
            <Button onClick={downloadOrdersAsCSV} className="gap-2 bg-orange-600 hover:bg-orange-700 flex-1 sm:flex-none h-10 px-3">
              <Download className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border overflow-hidden">
        {/* Mobile Card View (hidden on sm and up) */}
        <div className="sm:hidden">
          {currentOrders.map((order) => (
            <div key={order._id} className="border-b border-gray-100 last:border-b-0">
              <div className="p-4">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="font-mono text-sm font-semibold text-gray-900">
                      #{order._id.slice(-8)}
                    </div>
                    <Badge className={statusVariants({ status: order.status })}>
                      {order.status}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => toggleRow(order._id)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    {openOrderId === order._id ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </Button>
                </div>

                {/* Customer & Order Info */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900 text-sm">{order.customerName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <ShoppingBag className="h-3 w-3" />
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.createdAt ? format(new Date(order.createdAt), 'dd MMM, yyyy') : 'N/A'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-lg text-gray-900">
                      {formatCurrency(order.totalAmount)}
                    </div>
                    <Badge 
                      variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'} 
                      className={`text-xs ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} border-0`}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <Select value={order.status} onValueChange={(value) => handleStatusChange(order._id, value as IOrder['status'])}>
                    <SelectTrigger className="w-32 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="mx-4">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg">Delete Order</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 text-sm">
                          Are you sure you want to delete order #{order._id.slice(-8)}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDelete(order._id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {/* Expanded Content */}
              {openOrderId === order._id && (
                <div className="px-4 pb-4 bg-orange-50/30 border-t border-orange-100">
                  <div className="space-y-4 pt-4">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        Order Items
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm truncate">
                                {item.product?.name || 'Product not found'}
                              </div>
                              <div className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </div>
                            </div>
                            <div className="font-semibold text-gray-900 text-sm ml-2">
                              {formatCurrency(item.price)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Customer Details */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Customer Details
                      </h4>
                      <div className="space-y-2 bg-white p-3 rounded border">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-xs font-medium text-gray-900">Delivery Address</div>
                            <div className="text-xs text-gray-600 mt-1">{order.customerLocation}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <div className="text-xs text-gray-600">{order.customerWhatsapp}</div>
                        </div>
                        {order.customerEmail && (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 text-gray-400 flex items-center justify-center text-xs">@</div>
                            <div className="text-xs text-gray-600">{order.customerEmail}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Empty state for mobile */}
          {currentOrders.length === 0 && (
            <div className="text-center py-12 px-4">
              <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500 font-medium mb-2">No orders found</div>
              <div className="text-gray-400 text-sm">
                {searchTerm ? 'Try adjusting your search terms' : 'Orders will appear here when customers make purchases'}
              </div>
            </div>
          )}
        </div>

        {/* Desktop/Tablet Table View (visible on sm and up) */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="w-[40px] font-semibold text-gray-900"></TableHead>
                <TableHead className="font-semibold text-gray-900 min-w-[120px]">Order</TableHead>
                <TableHead className="font-semibold text-gray-900 min-w-[160px]">Customer</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden md:table-cell min-w-[100px]">Date</TableHead>
                <TableHead className="font-semibold text-gray-900 min-w-[80px]">Total</TableHead>
                <TableHead className="font-semibold text-gray-900 hidden lg:table-cell min-w-[100px]">Payment</TableHead>
                <TableHead className="font-semibold text-gray-900 min-w-[120px]">Status</TableHead>
                <TableHead className="text-right font-semibold text-gray-900 min-w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <React.Fragment key={order._id}>
                  <TableRow className="hover:bg-orange-50/30 transition-colors group border-b border-gray-100">
                    <TableCell>
                      <Button
                        onClick={() => toggleRow(order._id)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 transition-transform hover:bg-orange-100"
                      >
                        {openOrderId === order._id ? 
                          <ChevronUp className="h-4 w-4" /> : 
                          <ChevronDown className="h-4 w-4" />
                        }
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-mono text-sm text-gray-900 group-hover:text-orange-700 transition-colors">
                          #{order._id.slice(-8)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <ShoppingBag className="h-3 w-3" />
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="font-medium text-gray-900 truncate text-sm">{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{order.customerWhatsapp}</span>
                        </div>
                        {/* Show date on tablet when date column is hidden */}
                        <div className="md:hidden text-xs text-gray-500">
                          {order.createdAt ? format(new Date(order.createdAt), 'dd MMM, yyyy') : 'N/A'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-sm text-gray-600">
                        {order.createdAt ? format(new Date(order.createdAt), 'dd MMM, yyyy') : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {order.createdAt ? format(new Date(order.createdAt), 'HH:mm') : ''}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-gray-900 text-base lg:text-lg">
                        {formatCurrency(order.totalAmount)}
                      </div>
                      {/* Show payment info when payment column is hidden */}
                      <div className="lg:hidden mt-1">
                        <Badge 
                          variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'} 
                          className={`text-xs ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} border-0`}
                        >
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="space-y-1">
                        <Badge 
                          variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'} 
                          className={`${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} border-0 font-medium text-xs`}
                        >
                          {order.paymentStatus}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500 capitalize">
                          <CreditCard className="h-3 w-3" />
                          <span className="truncate">{order.paymentMethod}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select value={order.status} onValueChange={(value) => handleStatusChange(order._id, value as IOrder['status'])}>
                        <SelectTrigger className="w-[110px] lg:w-[130px] h-8">
                          <SelectValue>
                            <Badge className={`${statusVariants({ status: order.status })} text-xs px-2`}>{order.status}</Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
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
                            <AlertDialogTitle className="text-lg lg:text-xl">Delete Order</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600 text-sm">
                              Are you sure you want to delete order #{order._id.slice(-8)}? This action cannot be undone and will permanently remove the order. Deleting an order does not restock items.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(order._id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Order
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                  {openOrderId === order._id && (
                    <TableRow>
                      <TableCell colSpan={8} className="p-0">
                        <div className="p-4 lg:p-6 bg-orange-50/50 border-t border-orange-100">
                          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                            {/* Order Items */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4" />
                                Order Items
                              </h4>
                              <div className="space-y-2">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-orange-100">
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-gray-900 text-sm truncate">
                                        {item.product?.name || 'Product not found'}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        Quantity: {item.quantity}
                                      </div>
                                    </div>
                                    <div className="font-semibold text-gray-900 text-sm ml-2">
                                      {formatCurrency(item.price)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Customer Information */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Customer Details
                              </h4>
                              <div className="space-y-3 bg-white p-4 rounded-lg border border-orange-100">
                                <div className="flex items-start gap-3">
                                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <div className="text-xs lg:text-sm font-medium text-gray-900">Delivery Address</div>
                                    <div className="text-xs lg:text-sm text-gray-600 mt-1">{order.customerLocation}</div>
                                  </div>
                                </div>
                                {order.customerEmail && (
                                  <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 text-gray-400 flex items-center justify-center text-xs">@</div>
                                    <div className="text-xs lg:text-sm text-gray-600 truncate">{order.customerEmail}</div>
                                  </div>
                                )}
                                <div className="flex items-center gap-3">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <div className="text-xs lg:text-sm text-gray-600">{order.customerWhatsapp}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
              {currentOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-3">
                      <ShoppingBag className="h-12 w-12 text-gray-300" />
                      <div className="text-gray-500 font-medium">No orders found</div>
                      <div className="text-gray-400 text-sm text-center px-4">
                        {searchTerm ? 'Try adjusting your search terms' : 'Orders will appear here when customers make purchases'}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="bg-gray-50/50 px-3 sm:px-4 py-3 lg:px-6 lg:py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-700">Show</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="w-16 sm:w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-xs sm:text-sm text-gray-700">per page</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-700">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-2">
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
                
                <div className="hidden md:flex items-center gap-1">
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
                        className={`h-8 w-8 p-0 ${currentPage === page ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                      >
                        {page}
                      </Button>
                    )
                  ))}
                </div>

                <div className="md:hidden text-xs text-gray-600 px-2">
                  {currentPage} of {totalPages}
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