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
          className="rounded-full border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          size="icon"
          variant="outline"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="px-6 py-6 sm:max-w-xs bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border-l border-gray-200/80 dark:border-gray-800/80"
      >
        <div className="flex flex-col gap-6 mt-4">
          <div className="px-2">
            <Logo />
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          <NavMenu className="w-full" orientation="vertical" />
        </div>
      </SheetContent>
    </Sheet>
  );
};