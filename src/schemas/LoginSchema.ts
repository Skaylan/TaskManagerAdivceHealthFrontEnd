import * as z from "zod";

export const LoginSchema = z.object({
    email: z.email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
})