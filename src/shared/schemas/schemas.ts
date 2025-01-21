import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Неправильный email" }),
  password: z.string().nonempty({ message: "Без пароля нельзя)" }),
});
