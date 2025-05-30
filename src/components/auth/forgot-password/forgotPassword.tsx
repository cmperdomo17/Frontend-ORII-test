"use client";

import { forgotPasswordSchema } from "@/validations/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPasswordUser } from "@/actions/userAction";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/buttons/button";
import Header from "@/components/auth/layout/header";
import LabeledInput from "@/components/ui/form/labeledInput";

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordForm) => {
        setIsPending(true);

        try {
            const response = await forgotPasswordUser(data.email);
            localStorage.setItem("recover-email", data.email);

            if (response.success) {
                toast.success("Correo enviado. Revisa tu bandeja.");
                router.push("/change-password");
            } else {
                toast.error(response.error || "Error al enviar correo.");
            }
        } catch (error) {
            toast.error("Error al procesar la solicitud");
            console.error("Error al recuperar contraseña:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-3 w-full md:w-1/2">
            <div className="w-full p-2">
                <Header />
            </div>
            <div className="flex flex-col justify-center items-center w-full h-full py-10 md:py-0">
                <div className="flex flex-col items-start w-[70%] md:w-[50%]">
                    <h1 className="text-2xl md:text-3xl text-blue font-bold">Recuperar contraseña</h1>
                </div>
                <form className="flex flex-col gap-3 w-[70%] md:w-[50%] py-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-1 w-full">
                        <LabeledInput
                            label="Correo institucional"
                            id="email"
                            type="email"
                            placeholder="Ingresa tu correo institucional"
                            required={true}
                            className={errors.email ? "border-error" : ""}
                            {...register("email")}
                        />
                        {errors.email && (
                            <span className="text-xs md:text-sm text-error font-medium">{errors.email.message}</span>
                        )}
                    </div>

                    <Button type="submit" disabled={isPending} className="w-full mt-4">
                        {isPending ? "Enviando..." : "Enviar enlace de recuperación"}
                    </Button>
                </form>
            </div>
        </div>
    );
}