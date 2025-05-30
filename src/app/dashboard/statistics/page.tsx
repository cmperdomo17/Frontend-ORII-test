"use client";

import { ChartsLoadedContext } from "@/components/statistics/ChartsLoadedContext";
import { useStatistics } from "@/hooks/useStatistics";
import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/types/userType";

import StatisticsHeader from "@/components/statistics/statisticsHeader";
import PieChartAgreement from "@/components/statistics/pieChart/PieChartAgreement";
import BarChartMobilityByEvent from "@/components/statistics/barChart/BarChartMobilityByEvent";
import BarChartMobilityByFaculty from "@/components/statistics/barChart/BarChartMobilityByFaculty";
import LineChartMobilityTrend from "@/components/statistics/lineChart/LineChartMobilityTrend";
import BarChartMobilityByCountry from "@/components/statistics/barChart/BarChartMobilityByCountry";


export default function StatisticsPage() {

    const userSession = useAuthStore((state) => state.userSession);
    const role: UserRole = (userSession?.role as UserRole) || 'USER';

    const {
        statisticsData,
        chartsLoaded,
        activeFilters,
        handleFilter,
        removeFilter,
        fileBlob,
        disableExport
    } = useStatistics();

    return (
        <div className="flex flex-col gap-6 pb-10">
            <StatisticsHeader
                title="Estadísticas"
                description="Consulta estadísticas de convenios y movilidades. Filtra la información y exporta los datos para su uso."
                role={role}
                onFilter={handleFilter}
                onRemoveFilter={removeFilter}
                activeFilters={activeFilters}
                fileBlob={fileBlob}
                disableExport={disableExport}
            />

            <ChartsLoadedContext.Provider value={chartsLoaded}>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-10 mx-10 my-10">
                    <BarChartMobilityByCountry data={statisticsData?.byCountry}/>
                    <BarChartMobilityByEvent data={statisticsData?.byEvent}/>
                    <BarChartMobilityByFaculty data={statisticsData?.byFaculty}/>
                    <LineChartMobilityTrend data={statisticsData?.byYear}/>
                    <PieChartAgreement data={statisticsData?.byAgreementScope}/>
                </div>
            </ChartsLoadedContext.Provider>
        </div>
    );
}