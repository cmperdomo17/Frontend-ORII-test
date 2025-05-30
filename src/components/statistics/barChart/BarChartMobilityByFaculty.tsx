import React, { useState, useEffect } from "react";
import { ChartData, LoadingState, facultyData } from "@/types/chartTypes";
import { useChartsLoaded } from "@/components/statistics/ChartsLoadedContext";

import ChartWrapper from "../chartWrapper";
import BarChart from "./BarChart";

export default function BarChartMobilityByFaculty({ data }: { data?: facultyData[] }) {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [state, setState] = useState<LoadingState>(LoadingState.LOADING);

  const chartLoaded = useChartsLoaded();

  useEffect(() => {
    if (!chartLoaded) {
      setState(LoadingState.ERROR);
      return;
    }
    if (data == undefined) {
      setState(LoadingState.LOADING);
      return;
    }
    if (data[0].faculty.length === 0) {
      setState(LoadingState.NO_DATA);
    } else {
      setChartData({
        labels: data.map((item: any) => item.faculty)[0],
        datasets: [
          {
            label: "Salidas",
            data: data.map((item: any) => item.output)[0],
          },
          {
            label: "Entradas",
            data: data.map((item: any) => item.input)[0],
          },
        ],
      });
      setState(LoadingState.SUCCESS);
    }
  }, [data, chartLoaded]);


  return (
    <ChartWrapper state={state} chartType="bar">
      {chartData && <BarChart
        title="Movilidad por facultad"
        xLabel="Facultades"
        yLabel="Número de estudiantes/docentes en movilidad"
        data={chartData} 
      />}
    </ChartWrapper>
  );
};