/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import VueGtag from "vue-gtag";

export function registerPlugins(app) {
  app.use(vuetify);
  app.use(VueGtag, {
    config: {
      id: "G-T8MYVDB6JW",
      params: {
        anonymize_ip: true,
      },
    },
  });
}
