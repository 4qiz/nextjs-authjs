import { UserInfo } from "@/shared/components/user-info";
import { currentUserAsync } from "@/shared/lib/auth-js/current-user";

const Page = async () => {
  const user = await currentUserAsync();
  return (
    <UserInfo
      label="Client component"
      email={user?.email}
      id={user?.id}
      isTwoFactorEnabled={user?.isTwoFactorEnabled}
      name={user?.name}
      role={user?.role}
    />
  );
};

export default Page;
