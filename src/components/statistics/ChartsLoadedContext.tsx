import { createContext, useContext } from "react";

export const ChartsLoadedContext = createContext<boolean>(true);
export const useChartsLoaded = () => useContext(ChartsLoadedContext);