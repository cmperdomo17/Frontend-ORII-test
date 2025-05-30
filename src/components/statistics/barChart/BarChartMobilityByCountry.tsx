import React from "react";
import { Props } from "@/types/chartTypes";
import { useChartState } from "@/hooks/userChartState";

import ChartWrapper from "../chartWrapper";
import BarChart from "./BarChart";

export default function BarChartMobilityByCountry({ data }: Props) {

  const { chartData, state } = useChartState({data});

  return (
    <ChartWrapper state={state} chartType="bar">
      {chartData && <BarChart 
        title="Movilidad por países" 
        xLabel="Países" 
        yLabel="Número de movilidades" 
        data={chartData} 
      />}
    </ChartWrapper>
  );
}