
// 'use client';

// import Link from 'next/link';
// import { ShoppingCart, User, Bot, LogIn, LogOut, LayoutDashboard,  } from 'lucide-react';
// import { useCart } from '@/hooks/useCart';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { MobileNav } from './MobileNav';
// import { useSession, signOut } from 'next-auth/react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


// const Header = () => {
//   const { totalItems, isHydrated } = useCart();
//   const { data: session, status } = useSession();

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center">
//         <MobileNav />
//         <div className="mr-4 hidden md:flex">
//           <Link href="/" className="mr-6 flex items-center space-x-2">
//             <ShoppingCart className="h-6 w-6" />
//             <span className="hidden font-bold sm:inline-block font-headline">
//               Storely
//             </span>
//           </Link>
//           <nav className="flex items-center space-x-6 text-sm font-medium">
           
//             {status === 'authenticated' && (
//               <Link
//                 href="/admin"
//                 className="transition-colors hover:text-foreground/80 text-foreground"
//               >
//                 Dashboard
//               </Link>
//             )}
//           </nav>
//         </div>

//         <div className="flex flex-1 items-center justify-end space-x-2">
//           {status === 'authenticated' && (
//             <Button variant="ghost" size="icon" asChild>
//               <Link href="/admin/ai">
//                 <Bot className="h-5 w-5" />
//                 <span className="sr-only">AI Tools</span>
//               </Link>
//             </Button>
//           )}

//           <Button variant="ghost" size="icon" asChild>
//             <Link href="/cart" className="relative">
//               <ShoppingCart className="h-5 w-5" />
//               {isHydrated && totalItems > 0 && (
//                 <Badge
//                   variant="destructive"
//                   className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-1 text-xs"
//                 >
//                   {totalItems}
//                 </Badge>
//               )}
//               <span className="sr-only">Cart</span>
//             </Link>
//           </Button>

//           {status === 'authenticated' ? (
//              <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src={session.user?.image || 'https://placehold.co/100x100.png'} alt={session.user?.name || ''} data-ai-hint="avatar"/>
//                     <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">{session.user?.name}</p>
//                     <p className="text-xs leading-none text-muted-foreground">
//                       {session.user?.email}
//                     </p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link href="/admin">
//                     <LayoutDashboard className="mr-2 h-4 w-4" />
//                     <span>Dashboard</span>
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/auth/login' })}>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//              <Button asChild>
//               <Link href="/auth/login">
//                 <LogIn className="mr-2 h-4 w-4" />
               
//               </Link>
//             </Button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { ShoppingCart, User, Bot, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
// import { useCart } from '@/hooks/useCart';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { MobileNav } from './MobileNav';
// import { useSession, signOut } from 'next-auth/react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


// const Header = () => {
//   const { totalItems, isHydrated } = useCart();
//   const { data: session, status } = useSession();
//   const pathname = usePathname();

//   // Hide header on admin pages
//   if (pathname.startsWith('/admin')) {
//     return null;
//   }

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center">
//         <MobileNav />
//         <div className="mr-4 hidden md:flex">
//           <Link href="/" className="mr-6 flex items-center space-x-2">
//             <ShoppingCart className="h-6 w-6" />
//             <span className="hidden font-bold sm:inline-block font-headline">
//               Storely
//             </span>
//           </Link>
//           <nav className="flex items-center space-x-6 text-sm font-medium">
           
//             {status === 'authenticated' && (
//               <Link
//                 href="/admin"
//                 className="transition-colors hover:text-foreground/80 text-foreground"
//               >
//                 Dashboard
//               </Link>
//             )}
//           </nav>
//         </div>

//         <div className="flex flex-1 items-center justify-end space-x-2">
//           {status === 'authenticated' && (
//             <Button variant="ghost" size="icon" asChild>
//               <Link href="/admin/ai">
//                 <Bot className="h-5 w-5" />
//                 <span className="sr-only">AI Tools</span>
//               </Link>
//             </Button>
//           )}

//           <Button variant="ghost" size="icon" asChild>
//             <Link href="/cart" className="relative">
//               <ShoppingCart className="h-5 w-5" />
//               {isHydrated && totalItems > 0 && (
//                 <Badge
//                   variant="destructive"
//                   className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-1 text-xs"
//                 >
//                   {totalItems}
//                 </Badge>
//               )}
//               <span className="sr-only">Cart</span>
//             </Link>
//           </Button>

//           {status === 'authenticated' ? (
//              <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src={session.user?.image || 'https://placehold.co/100x100.png'} alt={session.user?.name || ''} data-ai-hint="avatar"/>
//                     <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">{session.user?.name}</p>
//                     <p className="text-xs leading-none text-muted-foreground">
//                       {session.user?.email}
//                     </p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link href="/admin">
//                     <LayoutDashboard className="mr-2 h-4 w-4" />
//                     <span>Dashboard</span>
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/auth/login' })}>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//              <Button asChild>
//               <Link href="/auth/login">
//                 <LogIn className="mr-2 h-4 w-4" />
               
//               </Link>
//             </Button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Bot, LogIn, LogOut, LayoutDashboard, Zap } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MobileNav } from './MobileNav';
import { useSession, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


const Header = () => {
  const { totalItems, isHydrated } = useCart();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Hide header on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80 shadow-sm">
      <div className="container flex h-16 items-center">
        <MobileNav />
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              {/* <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-1.5 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div> */}
            </div>
            <span className="hidden font-bold text-xl sm:inline-block font-headline bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Storely
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {status === 'authenticated' && (
              <Link
                href="/admin"
                className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 text-foreground font-semibold"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {status === 'authenticated' && (
            <Button variant="ghost" size="icon" asChild className="hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Link href="/admin/ai">
                <Bot className="h-5 w-5" />
                <span className="sr-only">AI Tools</span>
              </Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" asChild className="hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {isHydrated && totalItems > 0 && (
                <Badge
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-1 text-xs bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-lg"
                >
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {status === 'authenticated' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-indigo-500/50 transition-all">
                  <Avatar className="h-9 w-9 ring-2 ring-slate-200 dark:ring-slate-700">
                    <AvatarImage src={session.user?.image || 'https://placehold.co/100x100.png'} alt={session.user?.name || ''} data-ai-hint="avatar"/>
                    <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold">
                      {session.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-2xl border-slate-200 dark:border-slate-800 shadow-xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950/50 focus:bg-indigo-50 dark:focus:bg-indigo-950/50">
                  <Link href="/admin">
                    <LayoutDashboard className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/auth/login' })} className="cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/50 focus:bg-red-50 dark:focus:bg-red-950/50 text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all hover:scale-105">
              <Link href="/auth/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;