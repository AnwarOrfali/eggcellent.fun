'use client';

import React from 'react';
import { Egg, PlusCircle, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onOpenSubmit: () => void;
  onOpenDeployGuide: () => void;
}

export function Navbar({ onOpenSubmit, onOpenDeployGuide }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-200/50 bg-amber-50/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center shadow-md shadow-amber-300/40 text-amber-950 font-black">
            <Egg className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-neutral-900">
                Eggcellent<span className="text-amber-500">.fun</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                Community Recipes
              </span>
            </div>
            <p className="text-xs text-neutral-500 hidden md:block">
              For egg lovers, sunny-side up & beyond
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenDeployGuide}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 rounded-xl transition-all"
            title="Setup eggcellent.fun domain & Vercel hosting"
          >
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">Go-Live Setup</span>
          </button>

          <button
            onClick={onOpenSubmit}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-xl shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Recipe</span>
          </button>
        </div>
      </div>
    </header>
  );
}
