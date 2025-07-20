import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "O nome deve ter no mínimo 4 caracteres" })
      .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),
    email: z.email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });