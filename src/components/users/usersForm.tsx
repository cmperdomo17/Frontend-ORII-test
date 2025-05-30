"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";
import { Button } from "@/components/ui/buttons/button";
import LabeledInput from "@/components/ui/form/labeledInput";
import { UserPlus, Ban, Edit } from "lucide-react";
import { formSchema, type UserFormValues } from "@/validations/formSchema";
import {
  createAdmin,
  createLink,
  updateAdminAction,
  updateLinkAction,
  updatePasswordUserSUAction,
} from "@/actions/userAction";
import { toast } from "sonner";
import { SelectField } from "@/components/ui/form/selectField";
import { CreateUserResponse, UserData, UserRole } from "@/types/userType";
import { useRouter } from "next/navigation";
import { facultyDict } from "@/utils/movilityUtils";
import { UpdatePasswordPayload } from "@/types/passwordType";

interface UsersFormProps {
  initialValues?: UserFormValues;
  user?: UserData;
  onCloseU?: () => void;
  reloadUsers?: () => void;
  role: UserRole;
}

export default function UsersForm({
  initialValues,
  user,
  onCloseU,
  reloadUsers,
  role,
}: UsersFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
  } = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: user ? user.name : "",
      lastName: user ? user.lastName : "",
      email: user ? user.email : "",
      faculty: user ? user.faculty : "",
      role: user ? user.role : role === "SU" ? "" : "USER",
      password: "",
    },
  });

  const onSubmit = async (data: UserFormValues) => {

    try {
      let res;

      if (user) {
        // Editar usuario existente
        if (!user.userId) {
          throw new Error("User ID is undefined");
        }
        res =
          data.role === "ADMIN"
            ? await updateAdminAction(user.userId.toString(), data)
            : await updateLinkAction(user.userId.toString(), data);
        const newPassword = watch("password");
        handleUpdatePassword(newPassword);
      } else {
        res =
          data.role === "ADMIN"
            ? await createAdmin(data)
            : await createLink(data);
      }

      if (res.success) {
        handleSuccessfulOperation(data, user ? "update" : "create");
        return;
      }

      console.log("Error en la respuesta del servidor:", res);
      handleUserError({
        ...res,
        field: res.field as
          | "name"
          | "lastName"
          | "email"
          | "role"
          | "faculty"
          | "root"
          | undefined,
      });
    } catch (error) {
      console.error("Error inesperado en onSubmit:", error);
      handleUserError({
        success: false,
        error: "Error inesperado",
        field: "root",
      });
    }
  };

  const handleSuccessfulOperation = (
    data: UserFormValues,
    operation: "create" | "update"
  ) => {
    if (operation === "update") {
      toast.success("Usuario actualizado exitosamente");
      if (onCloseU) {
        onCloseU();
        reloadUsers?.();
      } else {
        router.push("/dashboard/users");
        router.refresh();
      }
      return;
    }

    // Diferentes mensajes dependiendo del rol para creación
    if (data.role === "ADMIN") {
      toast.info(
        "Se ha enviado un correo a " +
          data.name +
          " " +
          data.lastName +
          " con instrucciones para activar su cuenta"
      );
      toast.success("Admin creado exitosamente");
    } else {
      toast.success(
        "Énlace: " + data.name + " " + data.lastName + " creado exitosamente"
      );
    }

    router.push("/dashboard/users");
  };

  const handleUserError = (res: CreateUserResponse) => {
    setError("name", { type: "server", message: "" });
    setError("lastName", { type: "server", message: "" });
    setError("email", { type: "server", message: "" });
    setError("role", { type: "server", message: "" });
    setError("faculty", { type: "server", message: "" });
    setError("root", {
      type: "server",
      message: res.error,
    });
    toast.error(res.error);
  };

  const handleUpdatePassword = async (newPassword: string | undefined) => {
    if (!user?.userId || !newPassword) {
      return;
    }
    const passwordData: UpdatePasswordPayload = {
      userId: user?.userId,
      actualPassword: "vacio",
      newPassword: newPassword,
    };
    await updatePasswordUserSUAction(passwordData);
  };

  const handleCancel = () => {
    if (user) {
      onCloseU?.();
    } else {
      router.push("/dashboard/users");
    }
  };

  return (
    <div className="container">
      <Card className="max-w-2xl border-l-4 border-l-blue border-r-0 border-t-0 border-b-0 rounded-l-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue/10 to-transparent pb-6">
          <div className="flex items-center gap-3">
            {user ? (
              <Edit className="h-6 w-6 text-blue" />
            ) : (
              <UserPlus className="h-6 w-6 text-blue" />
            )}
            <CardTitle className="text-blueDark text-2xl">
              {user
                ? `Edición de ${role === "SU" ? "usuario" : "enlace"}`
                : `Registro de ${role === "SU" ? "usuario" : "enlace"}`}
            </CardTitle>
          </div>
          <CardDescription className="text-blueDark/70 mt-2">
            {user
              ? "Modifique los campos que desea editar."
              : `Complete el formulario para crear un nuevo ${
                  role === "SU" ? "usuario" : "enlace"
                }.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 px-8">
          <form
            onSubmit={(e) => {
              console.log("Formulario enviado");
              handleSubmit(onSubmit, (errors) => {
                console.log("Errores de validación:", errors); // Log de errores
              })(e);
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <LabeledInput
                  label="Nombre"
                  {...register("name")}
                  name="name"
                  type="text"
                  placeholder="Ingresa el nombre"
                  required
                  className={errors.name ? "border-error" : ""}
                />
                {errors.name && errors.name.message !== "" && (
                  <span className="text-xs md:text-sm text-error font-medium mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <LabeledInput
                  label="Apellido"
                  {...register("lastName")}
                  name="lastName"
                  type="text"
                  placeholder="Ingresa el apellido"
                  required
                  className={errors.lastName ? "border-error" : ""}
                />
                {errors.lastName && errors.lastName.message !== "" && (
                  <span className="text-xs md:text-sm text-error font-medium mt-1 block">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div
              className={`grid gap-6 ${
                user ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              }`}
            >
              <div>
                <LabeledInput
                  label="Email"
                  {...register("email")}
                  value={watch("email")}
                  name="email"
                  type="email"
                  placeholder="Ingresa el email"
                  required
                  className={errors.email ? "border-error" : ""}
                />
                {errors.email && errors.email.message !== "" && (
                  <span className="text-xs md:text-sm text-error font-medium mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {user && (
                <div>
                  <LabeledInput
                    label="Contraseña"
                    {...register("password")}
                    value={watch("password")}
                    name="password"
                    type="password"
                    placeholder="Nueva contraseña"
                    className={errors.password ? "border-error" : ""}
                  />
                  {errors.password && errors.password.message !== "" && (
                    <span className="text-xs md:text-sm text-error font-medium mt-1 block">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div
              className={`grid gap-6 ${
                role === "SU" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {role === "SU" && (
                <SelectField
                  id="role"
                  label="Rol"
                  tooltipText={
                    role === "SU"
                      ? "Seleccione el rol del usuario"
                      : "Como administrador solo puede registrar enlaces"
                  }
                  {...register("role")}
                  options={[
                    { value: "ADMIN", label: "Administrador" },
                    { value: "USER", label: "Enlace" },
                  ]}
                  defaultValue={
                    role === "SU" ? watch("role") ?? undefined : undefined
                  }
                  onValueChange={(value) => {
                    setValue("role", value);
                    // Un admin no está asociado a una facultad, establecer como cadena vacía
                    if (value === "ADMIN") {
                      setValue("faculty", "");
                    }
                  }}
                  value={role === "SU" ? watch("role") ?? undefined : undefined}
                  error={errors.role?.message}
                  className={
                    errors.role ? "border-error text-blueDark" : "text-blueDark"
                  }
                  placeholder="Seleccione un rol"
                />
              )}

              <SelectField
                id="faculty"
                label="Facultad"
                tooltipText="Seleccione la facultad del usuario"
                {...register("faculty")}
                options={Object.entries(facultyDict).map(([value, label]) => ({
                  value,
                  label,
                }))}
                defaultValue={watch("faculty") ?? ""}
                value={watch("faculty") ?? ""}
                onValueChange={(value) => setValue("faculty", value)}
                error={
                  typeof errors.faculty?.message === "string"
                    ? errors.faculty.message
                    : undefined
                }
                className={
                  errors.faculty
                    ? "border-error text-blueDark"
                    : "text-blueDark"
                }
                placeholder="Seleccione una facultad"
                isDisabled={watch("role") === "ADMIN"}
              />
            </div>

            <div className="pt-4 flex gap-4 justify-center">
              <Button type="submit" variant={"default"}>
                {user ? (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    {`Actualizar ${role === "SU" ? "usuario" : "enlace"}`}
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {`Crear ${role === "SU" ? "usuario" : "enlace"}`}
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant={"delete"}
                className="w-2/4"
                onClick={handleCancel}
              >
                <Ban className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
