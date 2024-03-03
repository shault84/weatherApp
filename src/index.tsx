import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./utils/Error";
import { WeatherContextProvider } from "./utils/WeatherContext";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new QueryClient();

root.render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <WeatherContextProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </WeatherContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

reportWebVitals();
