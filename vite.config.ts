import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"; // Plugin must be installed
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tailwindcss(), // Must be present to process CSS directives
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
  ],
  resolve: {
    // Enables native tsconfig paths resolution
    tsconfigPaths: true,
  },
  server: {
    // Exposes the server to your local network
    host: true,
  },
});