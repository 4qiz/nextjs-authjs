"use client";

import { routes } from "@/routes";
import { UserButton } from "@/shared/components/user-button";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>

        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>

        <Button
          asChild
          variant={pathname === routes.settings() ? "default" : "outline"}
        >
          <Link href={routes.settings()}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
