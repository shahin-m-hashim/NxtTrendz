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
      config: "/src/config",
      routes: "/src/routes",
      layouts: "/src/layouts",
      schemas: "/src/schemas",
      providers: "/src/providers",
      components: "/src/components",
    },
  },
  server: {
    port: 3000,
  },
});
