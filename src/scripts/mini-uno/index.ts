import { Generator } from "./generator";
import type { Plugin } from "vite";

export default function MiniUnoPlugin(): Plugin {
  const generator = new Generator();
  const cssSet = new Set<string>();
  let server: any = null;

  return {
    name: "vite-plugin-mini-uno",
    enforce: "pre",

    configureServer(_server) {
      server = _server;
    },

    buildStart() {
      console.log("🚀 Mini-UnoCSS Started!");
    },

    resolveId(id) {
      if (id === "virtual:uno.css") return id;
    },

    load(id) {
      if (id === "virtual:uno.css") {
        return Array.from(cssSet).join("\n");
      }
    },

    transform(code: string, id: string) {
      if (!id.endsWith(".vue")) return;

      console.log("⚡ transforming:", id);
      const styles = generator.generate(code);
      let hasNew = false;
      styles.forEach((css) => {
        if (!cssSet.has(css)) {
          cssSet.add(css);
          hasNew = true;
        }
      });

      if (hasNew && server) {
        const mod = server.moduleGraph.getModuleById("virtual:uno.css");
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({
            type: "update",
            updates: [
              {
                type: "js-update",
                path: "/virtual:uno.css",
                acceptedPath: "/virtual:uno.css",
                timestamp: Date.now(),
              },
            ],
          });
        }
      }
    },

    async handleHotUpdate({ file, modules, read }: any) {
      if (file.endsWith(".vue")) {
        const code = await read();
        const styles = generator.generate(code);
        styles.forEach((css) => cssSet.add(css));

        const virtualModule =
          server?.moduleGraph.getModuleById("virtual:uno.css");
        if (virtualModule) {
          server.moduleGraph.invalidateModule(virtualModule);
          return [...modules, virtualModule];
        }
      }
    },
  };
}
