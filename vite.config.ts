import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

// @ts-ignore - Bypassing strict type checking for the Vercel deployment engine
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro({
      preset: "vercel", 
    }),
    viteReact(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
