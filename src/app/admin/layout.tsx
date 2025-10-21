// 'use client';

// import { ReactNode } from 'react';
// import {
//   SidebarProvider,
//   Sidebar,
//   SidebarContent,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarFooter,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Bot, Home, Package, ShoppingCart, Tag, LogOut, Ticket } from "lucide-react";
// import Link from 'next/link';
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from '@/components/ui/button';
// import { signOut, useSession } from 'next-auth/react';

// export default function AdminLayout({ children }: { children: ReactNode }) {
//   const { data: session } = useSession();

//   const menuItems = [
    // { href: "/admin", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
    // { href: "/admin/products", icon: <Package className="h-5 w-5" />, label: "Products" },
    // { href: "/admin/categories", icon: <Tag className="h-5 w-5" />, label: "Categories" },
    // { href: "/admin/promos", icon: <Ticket className="h-5 w-5" />, label: "Promos" },
    // { href: "/admin/orders", icon: <ShoppingCart className="h-5 w-5" />, label: "Orders" },
    // { href: "/admin/ai", icon: <Bot className="h-5 w-5" />, label: "AI Tools" },
//   ];

//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen">
//         {/* Sidebar */}
//         <Sidebar className="pt-16 border-r">
//           <SidebarContent>
//             <SidebarMenu>
//               {menuItems.map((item, idx) => (
//                 <SidebarMenuItem key={idx}>
//                   <SidebarMenuButton asChild>
//                     <Link
//                       href={item.href}
//                       className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-colors"
//                     >
//                       {item.icon}
//                       <span className="text-sm font-medium">{item.label}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarContent>

//           {/* Footer */}
//           <SidebarFooter className="border-t pt-3">
//             <div className="flex items-center justify-between w-full">
//               <div className="flex items-center gap-3">
//                 <Avatar className="h-9 w-9">
//                   <AvatarImage
//                     src={session?.user?.image || "https://placehold.co/100x100.png"}
//                     alt="Admin"
//                     data-ai-hint="avatar"
//                   />
//                   <AvatarFallback>
//                     {session?.user?.name?.charAt(0) || "A"}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex flex-col leading-tight">
//                   <span className="text-sm font-semibold">
//                     {session?.user?.name || 'Admin'}
//                   </span>
//                   <span className="text-xs text-muted-foreground truncate max-w-[140px]">
//                     {session?.user?.email}
//                   </span>
//                 </div>
//               </div>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => signOut({ callbackUrl: '/auth/login' })}
//                 className="hover:bg-accent"
//               >
//                 <LogOut className="h-4 w-4" />
//               </Button>
//             </div>
//           </SidebarFooter>
//         </Sidebar>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           <header className="flex items-center justify-between p-4 border-b bg-background/50 backdrop-blur">
//             <SidebarTrigger />
//             <h2 className="font-headline text-xl font-semibold tracking-tight">Admin Panel</h2>
//           </header>
//           <main className="p-6 flex-1 overflow-y-auto">{children}</main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }

// update layout 
// 'use client';

// import { ReactNode } from 'react';
// import {
//   SidebarProvider,
//   Sidebar,
//   SidebarContent,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarFooter,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Bot, Home, Package, ShoppingCart, Tag, LogOut, Ticket, Bell, HelpCircle, Settings, CreditCard, BarChart3 } from "lucide-react";
// import Link from 'next/link';
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from '@/components/ui/button';
// import { signOut, useSession } from 'next-auth/react';

// export default function AdminLayout({ children }: { children: ReactNode }) {
//   const { data: session } = useSession();

//   const menuItems = [
//     { href: "/admin", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
//     { href: "/admin/orders", icon: <ShoppingCart className="h-5 w-5" />, label: "Orders" },
//     { href: "/admin/payments", icon: <CreditCard className="h-5 w-5" />, label: "Payments" },
//     { href: "/admin/customers", icon: <Bot className="h-5 w-5" />, label: "Customers" },
//     { href: "/admin/reports", icon: <BarChart3 className="h-5 w-5" />, label: "Reports" },
//     { href: "/admin/products", icon: <Package className="h-5 w-5" />, label: "Statistics" },
//   ];

//   const bottomMenuItems = [
//     { href: "/admin/notifications", icon: <Bell className="h-5 w-5" />, label: "Notifications" },
//     { href: "/admin/help", icon: <HelpCircle className="h-5 w-5" />, label: "Help" },
//     { href: "/admin/settings", icon: <Settings className="h-5 w-5" />, label: "Settings" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Custom Sidebar */}
//       <div className="w-64 bg-zinc-900 text-white flex flex-col">
//         {/* Logo */}
//         <div className="p-6 border-b border-zinc-800">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white text-sm font-bold">📊</span>
//             </div>
//             <span className="text-lg font-semibold">ProfitPulse</span>
//           </div>
//         </div>

//         {/* Main Navigation */}
//         <div className="flex-1 py-6">
//           <nav className="space-y-2 px-3">
//             {menuItems.map((item, idx) => (
//               <Link
//                 key={idx}
//                 href={item.href}
//                 className="flex items-center gap-3 px-3 py-3 rounded-r-3xl mr-4 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200 group"
//               >
//                 <span className="group-hover:scale-110 transition-transform">
//                   {item.icon}
//                 </span>
//                 <span className="text-sm font-medium">{item.label}</span>
//               </Link>
//             ))}
//           </nav>

//           {/* Bottom Navigation */}
//           <div className="mt-8 px-3">
//             <nav className="space-y-2">
//               {bottomMenuItems.map((item, idx) => (
//                 <Link
//                   key={idx}
//                   href={item.href}
//                   className="flex items-center gap-3 px-3 py-3 rounded-r-3xl mr-4 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200 group"
//                 >
//                   <span className="group-hover:scale-110 transition-transform">
//                     {item.icon}
//                   </span>
//                   <span className="text-sm font-medium">{item.label}</span>
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Footer with User Info */}
//         <div className="border-t border-zinc-800 p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage
//                   src={session?.user?.image || "https://placehold.co/100x100.png"}
//                   alt="Admin"
//                 />
//                 <AvatarFallback className="bg-red-500 text-white">
//                   {session?.user?.name?.charAt(0) || "A"}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col">
//                 <span className="text-sm font-semibold text-white">
//                   {session?.user?.name || 'Admin'}
//                 </span>
//                 <span className="text-xs text-zinc-400 truncate max-w-[120px]">
//                   {session?.user?.email}
//                 </span>
//               </div>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => signOut({ callbackUrl: '/auth/login' })}
//               className="hover:bg-zinc-800 text-zinc-300 hover:text-white"
//             >
//               <LogOut className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-white border-b border-gray-200 px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
//             </div>
//             <div className="flex items-center gap-4">
//               {/* Message Icon */}
//               <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
//                 <span className="text-gray-600">✉️</span>
//               </div>
              
//               {/* Search Icon */}
//               <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
//                 <span className="text-gray-600">🔍</span>
//               </div>
              
//               {/* User Profile */}
//               <div className="flex items-center gap-3">
//                 <Avatar className="h-10 w-10">
//                   <AvatarImage
//                     src={session?.user?.image || "https://placehold.co/100x100.png"}
//                     alt="Admin"
//                   />
//                   <AvatarFallback className="bg-red-500 text-white">
//                     {session?.user?.name?.charAt(0) || "KE"}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex flex-col">
//                   <span className="text-sm font-semibold text-gray-900">
//                     {session?.user?.name || 'Kristina Evans'}
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     {session?.user?.email || 'krisevans@gmail.com'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>
        
//         {/* Main Content */}
//         <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { ReactNode, useState } from 'react';
// import {
//   SidebarProvider,
//   Sidebar,
//   SidebarContent,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarFooter,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Bot, Home, Package, ShoppingCart, Tag, LogOut, Ticket, Bell, HelpCircle, Settings, CreditCard, BarChart3, Menu, X } from "lucide-react";
// import Link from 'next/link';
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from '@/components/ui/button';
// import { signOut, useSession } from 'next-auth/react';

// export default function AdminLayout({ children }: { children: ReactNode }) {
//   const { data: session } = useSession();

//   const menuItems = [
//     // { href: "/admin", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
//     // { href: "/admin/orders", icon: <ShoppingCart className="h-5 w-5" />, label: "Orders" },
//     // { href: "/admin/payments", icon: <CreditCard className="h-5 w-5" />, label: "Payments" },
//     // { href: "/admin/customers", icon: <Bot className="h-5 w-5" />, label: "Customers" },
//     // { href: "/admin/reports", icon: <BarChart3 className="h-5 w-5" />, label: "Reports" },
//     // { href: "/admin/products", icon: <Package className="h-5 w-5" />, label: "Statistics" },
//      { href: "/admin", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
//     { href: "/admin/products", icon: <Package className="h-5 w-5" />, label: "Products" },
//     { href: "/admin/categories", icon: <Tag className="h-5 w-5" />, label: "Categories" },
//     { href: "/admin/promos", icon: <Ticket className="h-5 w-5" />, label: "Promos" },
//     { href: "/admin/orders", icon: <ShoppingCart className="h-5 w-5" />, label: "Orders" },
//     { href: "/admin/ai", icon: <Bot className="h-5 w-5" />, label: "AI Tools" },
//   ];

//   const bottomMenuItems = [
//     { href: "/admin/notifications", icon: <Bell className="h-5 w-5" />, label: "Notifications" },
//     { href: "/admin/help", icon: <HelpCircle className="h-5 w-5" />, label: "Help" },
//     { href: "/admin/settings", icon: <Settings className="h-5 w-5" />, label: "Settings" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Mobile Overlay */}
//       <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden hidden" id="sidebar-overlay"></div>
      
//       {/* Custom Sidebar */}
//       <div className="fixed lg:static w-64 lg:w-64 md:w-16 bg-zinc-900 text-white flex flex-col h-full z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out" id="sidebar">
//         {/* Logo */}
//         <div className="p-6 lg:p-6 md:p-4 border-b border-zinc-800">
//           <div className="flex items-center gap-3 lg:gap-3 md:justify-center lg:justify-start">
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              
//             </div>
//             <span className="text-lg font-semibold lg:block md:hidden block">Storely</span>
//           </div>
//         </div>

//         {/* Main Navigation */}
//         <div className="flex-1 py-6">
//           <nav className="space-y-2 px-3">
//             {menuItems.map((item, idx) => (
//               <Link
//                 key={idx}
//                 href={item.href}
//                 className="flex items-center gap-3 lg:gap-3 md:justify-center lg:justify-start px-3 py-3 rounded-r-3xl mr-4 lg:mr-4 md:mr-2 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200 group"
//                 title={item.label}
//               >
//                 <span className="group-hover:scale-110 transition-transform">
//                   {item.icon}
//                 </span>
//                 <span className="text-sm font-medium lg:block md:hidden block">{item.label}</span>
//               </Link>
//             ))}
//           </nav>

//           {/* Bottom Navigation */}
//           <div className="mt-8 px-3">
//             <nav className="space-y-2">
//               {bottomMenuItems.map((item, idx) => (
//                 <Link
//                   key={idx}
//                   href={item.href}
//                   className="flex items-center gap-3 lg:gap-3 md:justify-center lg:justify-start px-3 py-3 rounded-r-3xl mr-4 lg:mr-4 md:mr-2 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200 group"
//                   title={item.label}
//                 >
//                   <span className="group-hover:scale-110 transition-transform">
//                     {item.icon}
//                   </span>
//                   <span className="text-sm font-medium lg:block md:hidden block">{item.label}</span>
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Footer with User Info */}
//         <div className="border-t border-zinc-800 p-4">
//           <div className="flex items-center justify-between lg:justify-between md:justify-center">
//             <div className="flex items-center gap-3 lg:gap-3 md:gap-0">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage
//                   src={session?.user?.image || "https://placehold.co/100x100.png"}
//                   alt="Admin"
//                 />
//                 <AvatarFallback className="bg-red-500 text-white">
//                   {session?.user?.name?.charAt(0) || "A"}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col lg:block md:hidden block">
//                 <span className="text-sm font-semibold text-white">
//                   {session?.user?.name || 'Admin'}
//                 </span>
//                 <span className="text-xs text-zinc-400 truncate max-w-[120px]">
//                   {session?.user?.email}
//                 </span>
//               </div>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => signOut({ callbackUrl: '/auth/login' })}
//               className="hover:bg-zinc-800 text-zinc-300 hover:text-white lg:block md:hidden block"
//             >
//               <LogOut className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
      

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col lg:ml-0 md:ml-16 ml-0">
//         {/* Mobile Menu Button */}
//         <button 
//           className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-900 text-white rounded-lg"
//           onClick={() => {
//             const sidebar = document.getElementById('sidebar');
//             const overlay = document.getElementById('sidebar-overlay');
//             sidebar?.classList.toggle('-translate-x-full');
//             overlay?.classList.toggle('hidden');
//           }}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>

//         {/* Header */}
      
        
//         {/* Main Content */}
//         <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 overflow-y-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import {
  Bot,
  Home,
  Package,
  ShoppingCart,
  Tag,
  LogOut,
  Ticket,
  Bell,
  HelpCircle,
  Settings,
  LayoutPanelTop
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  const menuItems = [
    { href: "/admin", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
    { href: "/admin/products", icon: <Package className="h-5 w-5" />, label: "Products" },
    { href: "/admin/categories", icon: <Tag className="h-5 w-5" />, label: "Categories" },
    { href: "/admin/promos", icon: <Ticket className="h-5 w-5" />, label: "Promos" },
    { href: "/admin/orders", icon: <ShoppingCart className="h-5 w-5" />, label: "Orders" },
    // { href: "/admin/ai", icon: <Bot className="h-5 w-5" />, label: "AI Tools" },
  ];

  const bottomMenuItems = [
    // { href: "/admin/notifications", icon: <Bell className="h-5 w-5" />, label: "Notifications" },
    { href: "/admin/help", icon: <HelpCircle className="h-5 w-5" />, label: "Help" },
    { href: "/", icon: <LayoutPanelTop className="h-5 w-5" />, label: "My Site" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden lg:hidden"
        id="sidebar-overlay"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className="fixed lg:sticky top-0 h-screen w-64 md:w-16 lg:w-64 bg-zinc-900 text-white flex flex-col z-50 
        -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out"
      >
        {/* Logo */}
        <div className="p-6 lg:p-6 md:p-4 border-b border-zinc-800">
          <div className="flex items-center gap-3 lg:gap-3 md:justify-center lg:justify-start">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"></div>
            <span className="text-lg font-semibold lg:block md:hidden block">Storely</span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="space-y-2 px-3">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="flex items-center gap-3 lg:gap-3 md:justify-center lg:justify-start px-3 py-3 rounded-r-3xl mr-4 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200 group"
                title={item.label}
              >
                <span className="group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="text-sm font-medium lg:block md:hidden block">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom Navigation */}
          <div className="mt-8 px-3">
            <nav className="space-y-2">
              {bottomMenuItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-3 lg:gap-3 md:justify-center lg:justify-start px-3 py-3 rounded-r-3xl mr-4 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200 group"
                  title={item.label}
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium lg:block md:hidden block">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer with User Info */}
        <div className="border-t border-zinc-800 p-4">
          <div className="flex items-center justify-between lg:justify-between md:justify-center">
            <div className="flex items-center gap-3 lg:gap-3 md:gap-0">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={session?.user?.image || "https://placehold.co/100x100.png"}
                  alt="Admin"
                />
                <AvatarFallback className="bg-red-500 text-white">
                  {session?.user?.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col lg:block md:hidden block">
                <span className="text-sm font-semibold text-white">
                  { 'Admin'}
                </span>
                
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="hover:bg-zinc-800 text-zinc-300 hover:text-white lg:block md:hidden block"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 md:ml-16 ml-0">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-900 text-white rounded-lg"
          onClick={() => {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            sidebar?.classList.toggle('-translate-x-full');
            overlay?.classList.toggle('hidden');
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Main Content Scrollable */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
