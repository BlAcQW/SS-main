// // app/HydrationErrorBoundary.tsx
// 'use client';

// import { useEffect ,useState } from 'react';

// export default function HydrationErrorBoundary({ children }) {
//   const [hasError, setHasError] = useState(false);

//   useEffect(() => {
//     const handleError = (e: ErrorEvent) => {
//       if (e.message.includes('hydration')) {
//         setHasError(true);
//       }
//     };
    
//     window.addEventListener('error', handleError);
//     return () => window.removeEventListener('error', handleError);
//   }, []);

//   if (hasError) {
//     return (
//       <div>
//         <h2>Loading Error</h2>
//         <button onClick={() => window.location.reload()}>
//           Refresh Page
//         </button>
//       </div>
//     );
//   }

//   return children;
// }


// app/HydrationErrorBoundary.tsx
'use client';

import { 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';

interface HydrationErrorBoundaryProps {
  children: ReactNode;
}

export default function HydrationErrorBoundary({ 
  children 
}: HydrationErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Use the browser's native ErrorEvent type
    const handleError = (e: ErrorEvent) => {
      if (e.message.includes('hydration')) {
        setHasError(true);
        console.error('Hydration error detected:', e.error);
      }
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className="p-4 bg-red-50 text-red-700">
        <h2 className="text-xl font-bold mb-2">Loading Error</h2>
        <p className="mb-4">
          There was a problem loading the page content. 
          Please refresh to try again.
        </p>
        <button 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return <>{children}</>;
}