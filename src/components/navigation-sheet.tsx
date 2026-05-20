'use client';

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { NavMenu } from "@/components/nav-menu";
import Logo from "./logo";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button
          className="rounded-full h-10 w-10 border-gray-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
          size="icon"
          variant="outline"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="px-6 py-8 sm:max-w-xs bg-white/90 dark:bg-[#131418]/95 backdrop-blur-2xl border-l border-gray-200/50 dark:border-white/5"
      >
        <div className="flex flex-col gap-8 mt-4">
          <div className="px-2">
            <Logo />
          </div>

          <hr className="border-gray-200/80 dark:border-white/10" />

          <NavMenu className="w-full" orientation="vertical" />
        </div>
      </SheetContent>
    </Sheet>
  );
};