import { FilterState } from './filterChartType';

export interface StatisticsHeaderProps {
    title: string;
    description?: string;
    role: string;
    onFilter: (filterType: string, value?: string) => void;
    onRemoveFilter: (filterType: string) => void;
    activeFilters?: FilterState;
    fileBlob: Blob | null;
    disableExport: boolean;
}

export interface ChartData {
    labels: string[];
    datasets: {
        label?: string;
        data: number[]
    }[];
}

export interface ChartProps {
    title: string;
    xLabel?: string;
    yLabel?: string;
    data: ChartData;
}

export enum LoadingState {
    LOADING,
    ERROR,
    NO_DATA,
    SUCCESS,
}

export interface ChartDataResponse {
    label: string[];
    count: number[];
}

export interface facultyData{
    faculty: string[];
    input: number[];
    output: number[];
}

export interface StatisticsResponse {
    total: number;
    byEvent: ChartDataResponse;
    byYear: ChartDataResponse;
    byCountry: ChartDataResponse;
    byCity: ChartDataResponse;
    byFaculty: facultyData[];
    byAgreementScope:ChartDataResponse;
}

export interface Props {
    data?: ChartDataResponse;
}