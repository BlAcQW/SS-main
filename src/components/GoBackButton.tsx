'use client';

import { ArrowLeft } from 'lucide-react';

export function GoBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-full border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95"
    >
      <ArrowLeft className="w-5 h-5" />
      Go Back
    </button>
  );
}
