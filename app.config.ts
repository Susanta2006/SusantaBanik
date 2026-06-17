// app.config.ts
import { defineConfig } from "@tanstack/start/config";

export default defineConfig({
  server: {
    preset: "vercel", // <--- This tells Nitro to create Vercel-compatible functions
  },
});
