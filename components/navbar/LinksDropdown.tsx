"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import UserIcon from "./UserIcon";
import { links } from "@/utils/links";
import SignOutLink from "./SignOutLink";
import { SignedOut, SignedIn, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

function LinksDropdown() {
  const { userId } = useAuth();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRole() {
      if (!userId) return;
      try {
        const response = await fetch(`/api/get-user-role?userId=${userId}`);
        const data = await response.json();
        setRole(data.role);
      } catch (err) {
        console.error("🔥 Error fetching role:", err);
      }
    }
    fetchRole();
  }, [userId]);

  console.log("🔍 User ID:", userId);
  console.log("🔍 User Role:", role);

  // Convert role to lowercase for consistent comparisons.
  const userRole = role ? role.toLowerCase() : "";

  // Define allowed link labels for each role.
  const adminAllowed = ["home", "favourites", "bookings", "reviews", "reservations", "create rentals", "my rentals", "admin", "profile"];
  const hostAllowed = ["home", "bookings", "reviews", "reservations", "profile"];
  const userAllowed = ["home", "favourites", "bookings", "reviews", "profile"];

  let filteredLinks;
  if (userRole === "admin") {
    filteredLinks = links.filter((link) =>
      adminAllowed.includes(link.label.toLowerCase())
    );
  } else if (userRole === "host") {
    filteredLinks = links.filter((link) =>
      hostAllowed.includes(link.label.toLowerCase())
    );
  } else {
    filteredLinks = links.filter((link) =>
      userAllowed.includes(link.label.toLowerCase())
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start" sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {filteredLinks.map((link) => (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="capitalize w-full">
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
