// import Link from 'next/link';
// import { ShoppingCart } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-muted/40">
//       <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
//         <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          
//           <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
//             Built by StricterTech Team
//           </p>
//         </div>
//          <div className="flex gap-4 items-center">
//             <Link href="/track" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//               Track Order
//             </Link>
//             <p className="text-center text-sm text-muted-foreground">
//               © {new Date().getFullYear()} Storely. All rights reserved.
//             </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import Link from 'next/link';
import { ShoppingCart, Zap, Package, TrendingUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
      
      <div className="container flex flex-col items-center justify-between gap-6 py-12 md:h-32 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-6 md:px-0">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              
            </div>
            <span className="font-bold text-lg font-headline bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Storely
            </span>
          </Link>
          
          <div className="hidden md:block w-px h-8 bg-slate-300 dark:bg-slate-700"></div>
          
          <p className="text-center text-sm leading-loose text-slate-600 dark:text-slate-400 md:text-left">
            Built by <span className="font-semibold text-slate-800 dark:text-slate-200">StricterTech Team</span>
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
          <Link 
            href="/track" 
            className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group"
          >
            <Package className="h-4 w-4 group-hover:scale-110 transition-transform" />
            Track Order
          </Link>
          
          <div className="hidden md:block w-px h-8 bg-slate-300 dark:bg-slate-700"></div>
          
          <p className="text-center text-sm text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} Storely. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;