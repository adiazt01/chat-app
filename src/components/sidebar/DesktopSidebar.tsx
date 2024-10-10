"use client";

import { useRoutes } from "@/hooks/useRoutes";
import { useState } from "react";
import { DesktopItem } from "./DesktopItem";
import { Profile } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedOut, SignOutButton } from "@clerk/nextjs";

interface DesktopSidebarProps {
  currentProfile: Profile;
}

export function DesktopSidebar({ currentProfile }: DesktopSidebarProps) {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item?.icon}
              active={item?.active}
              onClick={item?.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="relative">
            <Avatar className="relative">
              <AvatarImage src={currentProfile.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="absolute animate-pulse top-0 z-10 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 md:block hidden mb-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <SignOutButton>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
}
