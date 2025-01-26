"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/shared/hooks/use-current-user";
import { Button } from "@/shared/ui/button";

const Page = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <div className="bg-background p-10 rounded-xl">
      <Button type="submit" onClick={onClick}>
        Sign out
      </Button>
    </div>
  );
};

export default Page;
