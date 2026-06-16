import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite"; // <--- Add this import

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro(), // <--- Add this plugin here
    viteReact(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: true,
  },
});
