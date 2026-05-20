"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const links = [
    { title: "Home", href: "/" },
    { title: "Rooms", href: "/rooms" },
    { title: "Add Room", href: "/add-room" },
    { title: "My Listings", href: "/my-listings" },
    { title: "My Bookings", href: "/my-bookings" },
  ];

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="space-x-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:space-x-0 data-[orientation=vertical]:space-y-2 data-[orientation=vertical]:items-start w-full">
        {links.map((link) => (
          <NavigationMenuItem key={link.title}>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} bg-transparent w-full justify-start rounded-full font-semibold text-[13px] text-gray-600 dark:text-gray-300 hover:text-[#FA9500] dark:hover:text-[#FA9500] hover:bg-[#FA9500]/5 dark:hover:bg-[#FA9500]/10 data-[active]:text-[#FA9500] data-[active]:bg-[#FA9500]/10 transition-all duration-300 px-4`}
            >
              <Link href={link.href}>{link.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};