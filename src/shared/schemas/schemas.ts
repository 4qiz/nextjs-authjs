import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Неправильный email" }),
  password: z.string().nonempty({ message: "Без пароля нельзя)" }),
  // 2FA
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().nonempty({ message: "ну и как тебя зовут?" }),
  email: z.string().email({ message: "Неправильный email" }),
  password: z.string().min(6, { message: "Придумай хоть немного посложнее" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Неправильный email" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Придумай хоть немного посложнее" }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.nativeEnum(UserRole),
    email: z.optional(z.string().email({ message: "Неправильный email" })),
    password: z.optional(
      z.string().min(6, { message: "Придумай хоть немного посложнее" })
    ),
    newPassword: z.optional(
      z.string().min(6, { message: "Придумай хоть немного посложнее" })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    { message: "New password is required", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    { message: "Password is required", path: ["password"] }
  );
