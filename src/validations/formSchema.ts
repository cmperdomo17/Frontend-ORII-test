import { facultyDict } from "@/utils/movilityUtils";
import { z } from "zod";

export const formSchema = z
    .object({
        name: z
            .string()
            .min(1, "El nombre es obligatorio")
            .min(2, "El nombre debe tener al menos 2 caracteres")
            .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo debe contener letras"),

        lastName: z
            .string()
            .min(1, "El apellido es obligatorio")
            .min(2, "El apellido debe tener al menos 2 caracteres")
            .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo debe contener letras"),

        email: z
            .string()
            .min(1, "El email es obligatorio")
            .email("Ingrese un email válido")
            .refine((email) => email.endsWith("@unicauca.edu.co"), {
                message: "Este correo no es válido. Requiere @unicauca.edu.co",
            }),

        password: z
            .string()
            .optional()
            .refine((pass) => {
                if (!pass) return true;
                return pass.length >= 8 && pass.length <= 16;
            }, "La contraseña debe tener entre 8 y 16 caracteres")
            .refine((pass) => {
                if (!pass) return true;
                return /[A-ZÑ]/.test(pass);
            }, "La contraseña debe contener al menos una mayúscula")
            .refine((pass) => !pass || /[a-zñ]/.test(pass), {
                message: "Debe contener al menos una minúscula"
            })
            .refine((pass) => {
                if (!pass) return true;
                return /\d/.test(pass);
            }, "La contraseña debe contener al menos un número")
            .refine((pass) => !pass || /[@$!&]/.test(pass), {
                message: "La contraseña debe contener al menos un carácter especial (@, $, ! o &)"
            })
            .refine((pass) => {
                if (!pass) return true;
                return !/\s/.test(pass);
            }, "La contraseña no puede contener espacios"),

        emailVerified: z.boolean().optional().default(false),

        role: z
            .string()
            .min(1, "El rol es obligatorio")
            .refine((role) => ["ADMIN", "USER"].includes(role), {
                message: "El rol debe ser Administrador o Usuario",
            }),

        faculty: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.role === "USER") {
            if (!data.faculty || data.faculty.trim() === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["faculty"],
                    message: "La facultad es obligatoria para enlaces",
                });
            } else if (!Object.keys(facultyDict).includes(data.faculty)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["faculty"],
                    message: "Seleccione una facultad válida",
                });
            }
        }
    });

export type UserFormValues = z.infer<typeof formSchema>;