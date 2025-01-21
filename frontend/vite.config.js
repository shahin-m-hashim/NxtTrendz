import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: "/src/api",
      utils: "/src/utils",
      store: "/src/store",
      pages: "/src/pages",
      routes: "/src/routes",
      schemas: "/src/schemas",
      components: "/src/components",
    },
  },
  server: {
    port: 3000,
  },
});
