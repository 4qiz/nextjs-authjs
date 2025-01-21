"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export const BackButton = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  return (
    <Link href={href}>
      <Button variant="link" className="font-normal w-full" size="sm">
        {label}
      </Button>
    </Link>
  );
};
