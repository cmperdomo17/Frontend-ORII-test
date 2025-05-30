'use server';

import axios from "@/services/axios.service";
import { apiUrl } from "@/services/env.service";
import { deleteUser, updateAdmin, updateLink, updatePassword, updatePasswordUserSU } from "@/services/user.service";
import { UpdatePasswordPayload } from "@/types/passwordType";
import { UserData } from "@/types/userType";
import { AxiosError } from "axios";
import { PromiseSuccess } from "@/types/responseType";
import { CreateUserResponse } from "@/types/userType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function sanitizeUserPayload(data: UserData): UserData {
    const sanitizedData = { ...data };
    if (sanitizedData.role === "ADMIN") {
        delete sanitizedData.faculty;
    }
    return sanitizedData;
}

async function createUserBase(data: UserData, type: 'admin' | 'user'): Promise<CreateUserResponse> {
    const endpoint = type === 'admin' ? 'createAdmin' : 'createUser';
    const userType = type === 'admin' ? 'admin' : 'enlace';

    const cleanedData = sanitizeUserPayload(data);

    try {
        const response = await axios.post(`${API_URL}/users/${endpoint}`, cleanedData);

        return {
            success: true,
            data: {
                ...response.data,
            },
        };
    } catch (error) {
        const axiosError = error as AxiosError;
        // Determinar qué campo tiene el error
        let field: 'name' | 'lastName' | 'email' | 'role' | 'faculty' | 'root' = 'root';
        let errorMessage = `Error al crear el ${userType}. Inténtelo nuevamente.`;

        if (axiosError.response?.status === 400) {
            errorMessage = "Error de validación. Verifique los datos ingresados.";
            const responseData = axiosError.response?.data as CreateUserResponse;

            // Mapeo del campo con error
            const fieldMappings: Record<string, 'name' | 'lastName' | 'email' | 'role' | 'faculty'> = {
                'name': 'name',
                'lastName': 'lastName',
                'email': 'email',
                'role': 'role',
                'faculty': 'faculty'
            };

            // Buscar el campo en el error
            for (const [key, value] of Object.entries(fieldMappings)) {
                if (responseData?.error?.includes(key)) {
                    field = value;
                    break;
                }
            }
        } else if (axiosError.response?.status === 500) {
            errorMessage = "El correo ya está registrado. Ingrese otro.";
            field = 'email';
        }

        return {
            success: false,
            error: errorMessage,
            field: field,
        };
    }
}

// Funciones específicas que utilizan la función base
export async function createAdmin(data: UserData): Promise<CreateUserResponse> {
    return createUserBase(data, 'admin');
}

export async function createLink(data: UserData): Promise<CreateUserResponse> {
    return createUserBase(data, 'user');
}

async function updateUserBase(id: string, data: any, type: 'admin' | 'link'): Promise<PromiseSuccess> {
    const cleanedData = sanitizeUserPayload(data);

    const userType = type === 'admin' ? 'admin' : 'enlace';

    try {
        if (type === 'admin') {
            await updateAdmin(id, cleanedData);
        } else {
            await updateLink(id, data);
        }

        return {
            success: true,
        };
    } catch (error) {
        const axiosError = error as AxiosError;
        let errorMessage = `Error al actualizar el ${userType}. Inténtelo nuevamente.`;
        let field: 'name' | 'lastName' | 'email' | 'role' | 'faculty' | 'root' = 'root';

        if (axiosError.response?.status === 400) {
            errorMessage = "Error de validación. Verifique los datos ingresados.";
            const responseData = axiosError.response?.data as CreateUserResponse;

            // Mapeo del campo con error
            const fieldMappings: Record<string, 'name' | 'lastName' | 'email' | 'role' | 'faculty'> = {
                'name': 'name',
                'lastName': 'lastName',
                'email': 'email',
                'role': 'role',
                'faculty': 'faculty'
            };

            for (const [key, value] of Object.entries(fieldMappings)) {
                if (responseData?.error?.includes(key)) {
                    field = value;
                    break;
                }
            }
        } else if (axiosError.response?.status === 500) {
            errorMessage = "El correo ya está registrado. Ingrese otro.";
            field = 'email';
        }

        return {
            success: false,
            error: errorMessage,
            field: field
        };
    }
}

// Función base para obtener usuarios
async function getUsersBase(type: 'admin' | 'link'): Promise<any> {
    const endpoint = type === 'admin' ? 'getAdmins' : 'getUsers';
    const userType = type === 'admin' ? 'administradores' : 'usuarios';

    try {
        const response = await axios.get(`${API_URL}/users/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener los ${userType}:`, error);
        return [];
    }
}

export async function deleteUserAction(id: string): Promise<PromiseSuccess> {
    try {
        await deleteUser(id);
        return {
            success: true
        };
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return {
            success: false,
            error: "Error al eliminar el usuario. Inténtelo nuevamente."
        };
    }
}

export async function updateLinkAction(id: string, data: any): Promise<PromiseSuccess> {
    return updateUserBase(id, data, 'link');
}

export async function updateAdminAction(id: string, data: any): Promise<PromiseSuccess> {
    return updateUserBase(id, data, 'admin');
}

// Función para obtener todos los enlaces
export async function getLinks() {
    return getUsersBase('link');
}

// Función para obtener todos los administradores
export async function getAdmins() {
    return getUsersBase('admin');
}

// Función para obtener un usuario específico (faltaba en el CRUD)
export async function getUserById(id: string, type: 'admin' | 'link'): Promise<any> {
    try {
        const endpoint = type === 'admin' ? 'getAdmin' : 'getUser';
        const response = await axios.get(`${API_URL}/users/${endpoint}/${id}`);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error(`Error al obtener el ${type === 'admin' ? 'administrador' : 'enlace'}:`, error);
        return {
            success: false,
            error: `Error al obtener el ${type === 'admin' ? 'administrador' : 'enlace'}. Inténtelo nuevamente.`
        };
    }
}

export async function forgotPasswordUser(email: string): Promise<PromiseSuccess> {
    try {
        const response = await axios.post(`${apiUrl}/users/forgotpassword`, { email });

        if (response.data === true) {
            return { success: true };
        } else {
            return {
                success: false,
                error: "No se pudo enviar el correo de recuperación.",
                field: "email",
            };
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
            return {
                success: false,
                error: "Correo electrónico no verificado.",
                field: "email",
            };
        }
        console.error("Error al recuperar contraseña:", error);
        return {
            success: false,
            error: "Ocurrió un error al procesar la solicitud.",
            field: "root",
        };
    }
}

export async function updatePasswordUser(data: UpdatePasswordPayload): Promise<PromiseSuccess> {
    try {
        const response = await updatePassword(data);
        if (response.data === true) {
            return { success: true };
        }
        return {
            success: false,
            error: "No se pudo actualizar la contraseña.",
            field: "root",
        };
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        return {
            success: false,
            error: "Ocurrió un error al procesar la solicitud.",
            field: "root",
        };
    }
}

export async function updatePasswordUserSUAction(data: UpdatePasswordPayload): Promise<PromiseSuccess> {
    try {
        const response = await updatePasswordUserSU(data);
        if (response.data === true) {
            return { success: true };
        }
        return {
            success: false,
            error: "No se pudo actualizar la contraseña.",
            field: "root",
        };
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        return {
            success: false,
            error: "Ocurrió un error al procesar la solicitud.",
            field: "root",
        };
    }
}
