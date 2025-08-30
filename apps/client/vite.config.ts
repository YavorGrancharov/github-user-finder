import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { dependencies } from "./package.json";

function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (["react", "react-dom"].includes(key)) return;
    chunks[key.replace("@", "")] = [key];
  });
  return chunks;
}

export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ...renderChunks(dependencies),
        },
      },
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3005",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      "@api": `${path.resolve(__dirname, "./src/api/")}`,
      "@components": `${path.resolve(__dirname, "./src/components/")}`,
      "@ui": `${path.resolve(__dirname, "./src/ui/")}`,
      "@hooks": `${path.resolve(__dirname, "./src/hooks/")}`,
      shared: path.resolve(__dirname, "../../packages/shared/src"),
      public: `${path.resolve(__dirname, "./public/")}`,
    },
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
  },
});
