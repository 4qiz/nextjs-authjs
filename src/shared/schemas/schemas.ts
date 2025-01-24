import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Неправильный email" }),
  password: z.string().nonempty({ message: "Без пароля нельзя)" }),
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
