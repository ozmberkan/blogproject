import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Kullanıcı adı boş olamaz"),
  password: z.string().min(6, "Parola en az 6 karakter olmalıdır"),
});

export const registerSchema = z.object({
  username: z.string().min(1, "Kullanıcı adı boş olamaz"),
  email: z
    .string()
    .min(1, "Email boş olamaz")
    .email("Geçerli bir email giriniz"),
  password: z.string().min(6, "Parola en az 6 karakter olmalıdır"),
});
