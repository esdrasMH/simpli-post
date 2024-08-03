<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <img
          src="/favicon.jpeg"
          alt="logo de Simpli Post"
          class="ml-4"
          width="48"
          height="48"
          style="border-radius: 50%"
        />
      </template>

      <v-app-bar-title><strong>SimpliPost</strong></v-app-bar-title>

      <v-spacer></v-spacer>

      <template v-slot:append>
        <v-btn
          variant="tonal"
          class="mx-4"
          @click="cambiarTema"
          icon="mdi-theme-light-dark"
          :color="tema.global.name.value === 'dark' ? 'yellow' : 'blue'"
          title="Alternar tema entre claro y oscuro"
        ></v-btn>
        <v-btn
          variant="tonal"
          icon="mdi-github"
          href="https://github.com/esdrasMH/simpli-post"
          target="_blank"
          title="Ir al sitio web de GitHub"
          @click="
            capturarAnalitica(
              'Click',
              'Links',
              'Link de GitHub',
              'Ir al sitio web de GitHub'
            )
          "
        ></v-btn>
      </template>

      <template v-slot:extension>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" lg="10" xl="8" xxl="6">
              <v-tabs grow color="primary">
                <v-tab
                  id="vista-editor-publicacion"
                  text="Editor"
                  @click="
                    cambiarPestanaActiva(
                      0,
                      'Click',
                      'Tabs',
                      'Editor',
                      'Ir al edictor de la publicación'
                    )
                  "
                  title="Ir al edictor de la publicación"
                ></v-tab>
                <v-tab
                  id="vista-previa-publicacion"
                  text="Vista previa"
                  @click="
                    cambiarPestanaActiva(
                      1,
                      'Click',
                      'Tabs',
                      'Vista previa',
                      'Ir a la vista previa de la publicación'
                    )
                  "
                  title="Ir a la vista previa de la publicación"
                ></v-tab>
                <v-tab
                  id="vista-previa-ejemplo"
                  text="Ejemplo"
                  @click="
                    cambiarPestanaActiva(
                      2,
                      'Click',
                      'Tabs',
                      'Ejemplo',
                      'Ir a la vista previa de ejemplo'
                    )
                  "
                  title="Ir a la vista previa de ejemplo"
                ></v-tab>
              </v-tabs>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-app-bar>

    <v-main>
      <v-container id="scroll-target" class="overflow-y-auto">
        <v-row justify="center">
          <v-col cols="12" lg="10" xl="8" xxl="6">
            <EditorPublicacion
              v-if="pestanaActiva === 'editor'"
              @customEvent="handleCustomEvent"
            ></EditorPublicacion>
            <VistaPreviaPublicacion
              v-if="pestanaActiva === 'vista-previa'"
              :estadoFormulario="esValido"
            ></VistaPreviaPublicacion>
            <EjemploPublicacion
              v-if="pestanaActiva === 'ejemplo'"
            ></EjemploPublicacion>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useTheme } from "vuetify";
import { ref } from "vue";
import { event } from "vue-gtag";
import EditorPublicacion from "./components/EditorPublicacion.vue";
import VistaPreviaPublicacion from "./components/VistaPreviaPublicacion.vue";
import EjemploPublicacion from "./components/EjemploPublicacion.vue";

const tema = useTheme();
const pestanas = ref(["editor", "vista-previa", "ejemplo"]);
const pestanaActiva = ref("editor");
const esValido = ref(false);

function cambiarTema() {
  tema.global.name.value = tema.global.current.value.dark ? "light" : "dark";

  capturarAnalitica(
    "Click",
    "Buttons",
    "cambiarTema",
    "Alternar tema entre claro y oscuro"
  );
}

function cambiarPestanaActiva(
  indice,
  evento,
  categoria,
  etiqueta,
  descripcion
) {
  pestanaActiva.value = pestanas.value[indice];

  capturarAnalitica(evento, categoria, etiqueta, descripcion);
}

function handleCustomEvent(valor) {
  esValido.value = valor;
}

function capturarAnalitica(evento, categoria, etiqueta, descripcion) {
  event(evento, {
    event_category: categoria,
    event_label: etiqueta,
    event_action: descripcion,
  });
}
</script>

<style>
:root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.5;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h2 {
  font-size: 20px;
}
</style>
