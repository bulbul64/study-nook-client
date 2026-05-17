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
            <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} w-full justify-start rounded-full`}>
              <Link href={link.href}>{link.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};