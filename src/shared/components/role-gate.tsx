"use client";

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "../hooks/use-current-role";
import { FormError } from "./form-error";

export const RoleGate = ({
  allowedRole,
  children,
}: {
  allowedRole: UserRole;
  children: React.ReactNode;
}) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return <FormError message="No access" />;
  }

  return <>{children}</>;
};
