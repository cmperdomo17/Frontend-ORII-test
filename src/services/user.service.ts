import { apiUrl } from "./env.service";
import authApi from "./axios.service";
import { UpdatePasswordPayload } from "@/types/passwordType.js";

const url = `${apiUrl}/users`;

export const updatePassword = async (data: UpdatePasswordPayload) => {
    return await authApi.post(`${url}/updatepassword`, data);
}

export const updatePasswordUserSU = async (data: UpdatePasswordPayload) => {
    console.log("dada:", data);
    return await authApi.put(`${url}/updatePasswordUser`, data);
}

export const deleteUser = async (id: string) => {
    return await authApi.delete(`${url}/delete/${id}`);
}

export const updateAdmin = async (id: string, data: any) => {
    return await authApi.put(`${url}/updateAdmin/${id}`, data);
}

export const updateLink = async (id: string, data: any) => {
    return await authApi.put(`${url}/updateUser/${id}`, data);
}