import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "El correo es obligatorio")
        .email("El correo no es válido")
        .max(128, "El correo no puede tener más de 128 caracteres")
        .regex(/@unicauca\.edu\.co$/, "El correo debe ser institucional"),
});

export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, "La contraseña actual es obligatoria"),

    newPassword: z
        .string()
        .trim()
        .min(1, "La nueva contraseña es obligatoria")
        .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
        .max(128, "La contraseña no puede tener más de 128 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .regex(/\d/, "Debe contener al menos un número")
        .regex(/[@$!%*?&]/, "Debe contener al menos un símbolo especial"),

    confirmPassword: z
        .string()
        .min(1, "La confirmación es obligatoria"),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
}).refine(data => data.currentPassword !== data.newPassword, {
    message: "La nueva contraseña no puede ser igual a la actual",
    path: ["newPassword"]
});