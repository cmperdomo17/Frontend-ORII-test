"use server";

import { Movility, MovilityCrear } from "@/types/movilityType";
import { getMovilities, createMovility, updateMovility, deleteMovility, getMovilityById, getMobilitiesBlob } from "@/services/movility.service";

interface PromiseSuccess<T = unknown> {
    success: boolean;
    error?: string;
    field?: string;
    data?: T;
}

export async function fetchMovilities(): Promise<Movility[]> {
    try {
        const response = await getMovilities();
        return response.data.content;
    } catch (error) {
        console.error("Error al obtener las movilidades");
        return [];
    }
}

export async function createMovilityAction(data: MovilityCrear): Promise<PromiseSuccess<void>> {
    try {
        await createMovility(data);
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

export async function editMovilityAction(data: MovilityCrear, movilityId: number): Promise<PromiseSuccess<Movility>> {
    try {
        await updateMovility(data, movilityId);
        const response = await getMovilityById(movilityId);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false };
    }
}

export async function deleteMovilityAction(movilityId: number): Promise<PromiseSuccess<void>> {
    try {
        await deleteMovility(movilityId);
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

export async function getMovilityByIdAction(id: number): Promise<Movility | null> {
    try {
        const response = await getMovilityById(id);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function exportMobilities(): Promise<{ blob: Blob } | null> {
    try {
        const res = await getMobilitiesBlob();
        const blob = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        return { blob };
    } catch (error) {
        console.error("Error al exportar movilidades");
        return null;
    }
}
