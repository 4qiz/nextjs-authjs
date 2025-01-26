import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

export const UserInfo = ({
  label,
  email,
  id,
  name,
  role,
  isTwoFactorEnabled,
}: {
  label: string;
  id?: string | null;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  isTwoFactorEnabled?: boolean | null;
}) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ID */}
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-secondary rounded-md">
            {id}
          </p>
        </div>

        {/* Name */}
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="">{name}</p>
        </div>

        {/* email */}
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className=" ">{email}</p>
        </div>

        {/* Role */}
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="">{role}</p>
        </div>

        {/* 2FA */}
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <Badge variant={isTwoFactorEnabled ? "success" : "destructive"}>
            {isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
