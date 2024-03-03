import { ReactNode, createContext, useState } from "react";
import { FiveDaysDailyForecast } from "../service/@typs";

interface WeatherContextState {
  fiveDaysDailyForecast: FiveDaysDailyForecast[];
  setFiveDaysDailyForecast: (
    fiveDaysDailyForecast: FiveDaysDailyForecast[]
  ) => void;
}

const initialState: WeatherContextState = {
  fiveDaysDailyForecast: [],
  setFiveDaysDailyForecast: () => {},
};

//create context
const WeatherContext = createContext<WeatherContextState>(initialState);

//wrapper component:
export const WeatherContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [fiveDaysDailyForecast, setFiveDaysDailyForecast] = useState<
    FiveDaysDailyForecast[]
  >([]);
  return (
    <WeatherContext.Provider
      value={{
        fiveDaysDailyForecast,
        setFiveDaysDailyForecast,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
