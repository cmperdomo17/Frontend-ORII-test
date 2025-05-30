import { Column } from "@/types/userType";

export const columns: Column[] = [
    { key: "name", header: "Nombre" },
    { key: "lastName", header: "Apellido" },
    { key: "email", header: "Correo electrónico" },
    { key: "emailVerified", header: "Verificado" },
    { key: "role", header: "Rol" },
    { key: "faculty", header: "Facultad" },
];