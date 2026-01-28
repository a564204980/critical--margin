import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";
import MiniUnoPlugin from "./src/scripts/mini-uno/index";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [MiniUnoPlugin(), uni()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
