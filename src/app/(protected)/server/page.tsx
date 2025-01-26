"use client";
import { UserInfo } from "@/shared/components/user-info";
import { useCurrentUser } from "@/shared/hooks/use-current-user";

const Page = () => {
  const user = useCurrentUser();
  return (
    <UserInfo
      label="Server component"
      email={user?.email}
      id={user?.id}
      isTwoFactorEnabled={user?.isTwoFactorEnabled}
      name={user?.name}
      role={user?.role}
    />
  );
};

export default Page;
