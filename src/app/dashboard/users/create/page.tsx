"use client";

import Title from "@/components/ui/typography/title";
import UsersForm from "@/components/users/usersForm";
import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/types/userType";

export default function CreateUserPage() {
  const userSession = useAuthStore((state) => state.userSession);
  const role: UserRole = (userSession?.role as UserRole) || "USER";
  return (
    <>
      <div className="mb-4">
        <Title title={role === "SU" ? "Crear usuario" : "Crear enlace"} />
        <p className="text-muted-foreground mt-2">
          {`A continuación podrá crear un ${
            role === "SU" ? "usuario" : "enlace"
          }. Por favor verifique que la
          información ingresada es correcta e ingrese todos los campos.`}
        </p>
      </div>
      <UsersForm role={role} />
    </>
  );
}
