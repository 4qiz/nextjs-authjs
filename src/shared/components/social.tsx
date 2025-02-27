"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, { redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT_URL });
  };
  return (
    <div className="w-full flex gap-x-2 items-center">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          onClick("google");
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          onClick("github");
        }}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
