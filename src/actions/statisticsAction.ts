'use server';

import { getStatisticsData, getStatisticsReportBlob } from "@/services/statistics.service";
import { StatisticsResponse } from "@/types/chartTypes";

export async function fetchStatisticsData(filters: Record<string, any> = {}): Promise<StatisticsResponse> {
    try {
        const response = await getStatisticsData(filters);
        return response;
    } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
        throw error;
    }
}

export async function exportStatisticsReport(): Promise<{ blob: Blob } | null> {
    try {
        const data = await getStatisticsReportBlob();
        const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        return { blob };
    } catch (error) {
        console.error("Error al obtener el blob de estadísticas:", error);
        return null;
    }
}