import PieChart from "./PieChart";
import { Props } from "@/types/chartTypes";
import { useChartState } from "@/hooks/userChartState";

import ChartWrapper from "../chartWrapper";

export default function PieChartInternationalAgreement({ data }: Props) {
  
  const { chartData, state } = useChartState({data});

  return (
    <ChartWrapper state={state} chartType="pie">
      {chartData && 
      <PieChart 
        title="Convenios internacionales" 
        data={chartData} 
      />}
    </ChartWrapper>
  );
}