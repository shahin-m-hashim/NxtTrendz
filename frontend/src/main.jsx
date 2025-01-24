import "./app.css";
import App from "./App.jsx";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ErrorPage from "pages/ErrorPage";
import ErrorBoundary from "components/wrappers/ErrorBoundary";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 1 * 60 * 60 * 1000, // 1 hour
    },
  },
});

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ErrorBoundary fallback={<ErrorPage />}>
    <QueryClientProvider op client={queryClient}>
      <App />
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </ErrorBoundary>
  // </StrictMode>
);
