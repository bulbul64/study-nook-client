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
        <Button className="rounded-full" size="icon" variant="outline">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="px-6 py-6 sm:max-w-xs">
        <div className="flex flex-col gap-6 mt-4">
          <div className="px-2">
            <Logo />
          </div>
          <hr className="border-border/60" />
          <NavMenu className="w-full" orientation="vertical" />
        </div>
      </SheetContent>
    </Sheet>
  );
};