import authApi from "./axios.service";
import { apiUrl } from "./env.service";
import { StatisticsResponse  } from "@/types/chartTypes";

const url = `${apiUrl}/statistics`;

export const getStatisticsData = async (filters: Record<string, any> = {}): Promise<StatisticsResponse> => {
    const response = await authApi.post(`${url}/filter`, filters);
    return response.data;
}

export const getStatisticsReportBlob = async (filters: Record<string, any> = {}) => {
    const response = await authApi.post(`${url}/export`, filters, { responseType: 'arraybuffer' });
    return response.data;
} 