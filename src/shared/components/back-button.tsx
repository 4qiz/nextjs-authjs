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
    <Button variant="link" className="font-normal w-full">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
