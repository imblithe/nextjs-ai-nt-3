"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const links = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/course", label: "หลักสูตร" },
  { href: "/product", label: "สินค้า" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const pathname = usePathname();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink
                asChild
                active={active}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "rounded-full",
                  active && "bg-accent text-primary hover:bg-accent"
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};