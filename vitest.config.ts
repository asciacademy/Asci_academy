import { defineConfig } from "vitest/config"
import path from "node:path"

export default defineConfig({
  test: {
    include: ["__tests__/**/*.test.{ts,tsx,js}"],
    exclude: ["**/node_modules/**", "**/.agent/**", "**/.next/**"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
})
