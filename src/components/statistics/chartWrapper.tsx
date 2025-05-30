import React from "react";
import { LoadingState } from "@/types/chartTypes";

import SkeletonBarChart from "@/components/ui/charts/skeletonBarChart";
import SkeletonPieChart from "@/components/ui/charts/skeletonPieChart";
import SkeletonLineChart from "@/components/ui/charts/skeletonLineChart";
import ChartError from "@/components/ui/charts/chartError";
import ChartNoFound from "@/components/ui/charts/chartNoFound";


interface ChartWrapperProps {
  state: LoadingState;
  chartType: "bar" | "pie" | "line";
  children: React.ReactNode;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ state, chartType, children }) => {
  const getSkeletonComponent = () => {
    switch (chartType) {
      case "bar":
        return <SkeletonBarChart />;
      case "pie":
        return <SkeletonPieChart />;
      case "line":
        return <SkeletonLineChart />;
      default:
        return null;
    }
  };

  let content;
  switch (state) {
    case LoadingState.LOADING:
      content = getSkeletonComponent();
      break;
    case LoadingState.ERROR:
      content = <ChartError />;
      break;
    case LoadingState.NO_DATA:
      content = <ChartNoFound />;
      break;
    case LoadingState.SUCCESS:
      content = children;
      break;
    default:
      content = null;
  }

  return (
    <div className="chart-container border border-gray-100 bg-white rounded-2xl min-h-[550px] shadow-none hover:shadow-xl flex flex-col justify-between">
      <div className="m-5 flex-grow ">
        {content}
      </div>
    </div>
  );  
};

export default ChartWrapper;