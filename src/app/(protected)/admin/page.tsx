"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/shared/components/role-gate";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const Page = () => {
  const onAdminServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
      }
    });
  };

  const onAdminApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Admin API Route Clicked");
      } else {
        toast.error("No access");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <p>You are an admin</p>
        </RoleGate>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="font-medium text-sm">Admin API Route</p>
          <Button onClick={onAdminApiRouteClick}>Click</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="font-medium text-sm">Admin Server Action</p>
          <Button onClick={onAdminServerActionClick}>Click</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
