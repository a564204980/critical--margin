import { createSSRApp } from "vue";
import App from "./App.vue";
import "@/style/global.scss";

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
