import { useState, useEffect } from "react";
import { ChartData, LoadingState } from "@/types/chartTypes";
import { useChartsLoaded } from "@/components/statistics/ChartsLoadedContext";
import { Props } from "@/types/chartTypes";

export function useChartState({data}: Props) {
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
    if (data.label.length === 0 || data.count.length === 0) {
      setState(LoadingState.NO_DATA);
    } else {
      setChartData({
        labels: data.label,
        datasets: [
          {
            data: data.count,
          },
        ],
      });
      setState(LoadingState.SUCCESS);
    }
  }, [data, chartLoaded]);

  return { chartData, state };
}