import BarChart from "./BarChart";
import { Props } from "@/types/chartTypes";
import { useChartState } from "@/hooks/userChartState";

import ChartWrapper from "../chartWrapper";

export default function BarChartMobilityByEvent({ data }: Props) {
  
  const { chartData, state } = useChartState({data});

  return (
    <ChartWrapper state={state} chartType="bar">
      {chartData && <BarChart
        title="Distribución por tipo de movilidad"
        xLabel="Evento"
        yLabel="Número de movilidades"
        data={chartData}
      />}
    </ChartWrapper>
  );
}