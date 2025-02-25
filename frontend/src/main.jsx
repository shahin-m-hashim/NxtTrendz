import "./app.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import queryClient from "config/queryClientConfig";
import { QueryClientProvider } from "@tanstack/react-query";

import ErrorPage from "pages/ErrorPage";
import { GlobalProvider } from "providers/GlobalProvider";
import ErrorBoundary from "components/wrappers/ErrorBoundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || "production";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <GlobalProvider>
        <QueryClientProvider client={queryClient}>
          <App />

          {ENVIRONMENT === "development" && <ReactQueryDevtools />}
        </QueryClientProvider>
      </GlobalProvider>
    </ErrorBoundary>
  </StrictMode>
);
