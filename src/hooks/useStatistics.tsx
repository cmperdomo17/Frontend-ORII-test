import { useState, useEffect } from "react";
import { FilterState } from "@/types/filterChartType";
import { exportStatisticsReport } from "@/actions/statisticsAction";
import { fetchStatisticsData } from "@/actions/statisticsAction";
import { StatisticsResponse } from "@/types/chartTypes";
import { semesterMap, facultyMap } from "@/types/filterChartType";

export function useStatistics() {

    const [activeFilters, setActiveFilters] = useState<FilterState>({});

    const [statisticsData, setStatisticsData] = useState<StatisticsResponse | null>(null);
    const [chartsLoaded, setchartsLoaded] = useState(true);

    const [fileBlob, setFileBlob] = useState<Blob | null>(null);
    const [disableExport, setDisableExport] = useState(true);

    // Exportar el reporte de estadísticas
    useEffect(() => {
        async function fetchData() {
            try {
                const expData = await exportStatisticsReport();
                if (expData?.blob) { 
                    setDisableExport(false);
                    setFileBlob(expData.blob); 
                }
            } catch (error) {
                console.error("Error al obtener el reporte de estadísticas:", error);
            }
        }
        fetchData();
    }, []);

    // Obtener los datos de estadísticas
    useEffect(() => {
        async function fetchData() {
            try {

                //Transformar los filtros activos para que coincidan con el formato esperado por la API
                const translatedFilters = {
                    ...(activeFilters.semester !== undefined && activeFilters.semester !== "" && {
                        semester: semesterMap[activeFilters.semester as keyof typeof semesterMap],
                    }),
                    ...(activeFilters.faculty !== undefined && activeFilters.faculty !== "" && {
                        faculty: facultyMap[activeFilters.faculty as keyof typeof facultyMap],
                    }),
                    ...(activeFilters.year !== undefined && activeFilters.year !== "" && {
                        year: Number(activeFilters.year),
                    }),
                };
                const data = await fetchStatisticsData(translatedFilters);
                setStatisticsData(data);
            } catch (error) {
                setchartsLoaded(false);
                console.error("Error al obtener el reporte de estadísticas:", error);
            }
        }
        fetchData();
    }, [activeFilters]);

    const removeFilter = (filterType: string) => {
        const newFilters = { ...activeFilters };
        delete newFilters[filterType as keyof FilterState];
        setActiveFilters(newFilters);
    }

    const handleFilter = (filterType: string, value?: string) => {
        let newFilters = { ...activeFilters };

        if (filterType === 'reset') {
            newFilters = {};
        } else if (newFilters[filterType as keyof FilterState] === value) {
            delete newFilters[filterType as keyof FilterState];
        } else {
            newFilters[filterType as keyof FilterState] = value;
        }

        setActiveFilters(newFilters);
    };

    return {
        statisticsData,
        chartsLoaded,
        activeFilters,
        handleFilter,
        removeFilter,
        fileBlob,
        disableExport
    };
}