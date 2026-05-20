"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 border-gray-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-[#FA9500]" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-[#FA9500]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="rounded-2xl p-2 min-w-[140px] bg-white/90 dark:bg-[#1a1c23]/95 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-xl"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="rounded-xl font-medium cursor-pointer focus:bg-[#FA9500]/10 focus:text-[#FA9500] dark:text-gray-200"
        >
          Light
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="rounded-xl font-medium cursor-pointer focus:bg-[#FA9500]/10 focus:text-[#FA9500] dark:text-gray-200"
        >
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="rounded-xl font-medium cursor-pointer focus:bg-[#FA9500]/10 focus:text-[#FA9500] dark:text-gray-200"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}