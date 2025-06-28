import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    define: {
      'process.env': {
        VITE_API_URL: JSON.stringify(env.VITE_API_URL)
      }
    },
    server: {
      proxy: {
       '/api': 'http://127.0.0.1:5000',
    
    
    }
  },
    build: {
      outDir: "build",
      sourcemap: true
    },
    base: env.VITE_PUBLIC_URL || "/"
  };
});