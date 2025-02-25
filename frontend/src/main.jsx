import "./app.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import ErrorPage from "pages/ErrorPage";
import { GlobalProvider } from "providers/GlobalProvider";
import ErrorBoundary from "components/wrappers/ErrorBoundary";
import queryClient from "config/queryClientConfig";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <GlobalProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </GlobalProvider>
    </ErrorBoundary>
  </StrictMode>
);
