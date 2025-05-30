import LineChart from "./LineChart";
import { Props } from "@/types/chartTypes";
import { useChartState } from "@/hooks/userChartState";

import ChartWrapper from "../chartWrapper";

export default function LineChartMobilityTrend({ data }: Props) {
  
  const { chartData, state } = useChartState({data});

  return (
    <ChartWrapper state={state} chartType="line">
      {chartData && 
      <LineChart 
        title="Tendencia de movilidad anual" 
        xLabel="Año" 
        yLabel="Número de movilidades" 
        data={chartData} 
      />}
    </ChartWrapper>
  );
}