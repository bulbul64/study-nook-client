'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#131418] transition-colors duration-300">
      <div className="flex flex-col items-center gap-5">
        
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>

          <div className="absolute inset-0 rounded-full border-4 border-t-[#ee6923] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>

        {/* Text */}
        <div className="text-sm font-medium text-gray-600 dark:text-gray-300 tracking-wide">
          Loading...
        </div>

        {/* Subtle pulse bar */}
        <div className="w-32 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div className="h-full w-1/2 bg-[#ee6923] animate-pulse"></div>
        </div>

      </div>
    </div>
  );
}