<template>
  <section>
    <div class="my-4">
      <v-btn
        id="copiar-texto"
        color="primary text float-right"
        @click="copiarTexto"
        title="Copiar texto de la vacante en el portapapeles"
        :disabled="!props.estadoFormulario"
      >
        <v-icon icon="mdi-content-copy"></v-icon>
        <span v-if="smAndUp" class="ml-2">Copiar texto</span>
      </v-btn>
      <h2 class="my-4">Vista previa de la publicación</h2>
    </div>

    <section
      id="vista-previa"
      :class="{ 'desactivar-seleccion-vista-previa': !props.estadoFormulario }"
    >
      <p>
        Saludos querida red 👋 en #{{
          capitalizarTexto(vacante.empresa)
        }}
        tenemos el agrado de informar sobre nuestra búsqueda de nuevo talento
        para el cargo #{{
          capitalizarTexto(vacante.cargo?.nombre || vacante?.cargo)
        }}
        🚀 en modalidad #{{ capitalizarTexto(vacante.modalidad?.nombre) }}.
      </p>
      <br />

      <h3>🏢 Sobre la empresa: {{ vacante.empresa }}</h3>
      <p>{{ vacante.descripcionEmpresa }}</p>
      <br />

      <h3>
        💼 Sobre la vacante: {{ vacante.cargo?.nombre || vacante?.cargo }}
      </h3>
      <p>{{ vacante.descripcionVacante }}</p>
      <br />

      <h3>📋 Responsabilidades</h3>
      <ul v-if="vacante.tareas.length">
        <li v-for="tarea in vacante.tareas">🔹 {{ tarea }}</li>
      </ul>
      <br />

      <h3>✅ Requisitos excluyentes</h3>
      <ul v-if="vacante.requisitosExcluyentes.length">
        <li v-for="requisito in vacante.requisitosExcluyentes">
          🔹 {{ requisito }}
        </li>
      </ul>
      <br />

      <div v-if="vacante.requisitosDeseables.length">
        <h3>⭐ Requisitos deseables</h3>
        <ul>
          <li v-for="requisito in vacante.requisitosDeseables">
            🔹 {{ requisito }}
          </li>
        </ul>
        <br />
      </div>

      <div v-if="vacante.pagoMinimo">
        <h3>💰 Salario</h3>
        <p v-if="vacante.pagoMinimo && vacante.pagoMaximo">
          Entre {{ formatearNumero(vacante.pagoMinimo) }} y
          {{ formatearNumero(vacante.pagoMaximo) }} {{ vacante.moneda?.id }}
        </p>
        <p v-else-if="vacante.pagoMinimo">
          {{ formatearNumero(vacante.pagoMinimo) }} {{ vacante.moneda?.id }}
        </p>
        <br />
      </div>

      <div v-if="vacante.beneficios.length">
        <h3>🎁 Beneficios</h3>
        <ul>
          <li v-for="beneficio in vacante.beneficios">🔹 {{ beneficio }}</li>
        </ul>
        <br />
      </div>

      <h3>🕒 Jornada: {{ vacante.jornada?.nombre }}</h3>
      <h3>🌐 Modalidad: {{ vacante.modalidad?.nombre }}</h3>
      <h3 v-if="mostrarPais">
        🌎 País: {{ vacante.pais?.nombre || vacante?.pais }}
      </h3>
      <h3 v-if="mostrarDireccion">📍Dirección: {{ vacante.direccion }}</h3>
      <br />

      <h3>✉️ Contacto: {{ vacante.contacto }}</h3>
      <br />

      <p>
        Si nuestra vacante se ajusta a tu perfil, no dudes en enviarnos tu CV
        actualizado al correo de contacto con el asunto
        <strong>{{ vacante.cargo?.nombre || vacante?.cargo || "#" }}</strong
        >, junto con un breve resumen sobre tí.
      </p>
      <br />

      <div v-if="generarHashtag.length || true">
        <strong v-for="hashtag in generarHashtag">
          {{ `#${hashtag} ` }}
        </strong>
      </div>
    </section>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, defineProps, reactive, computed } from "vue";
import { useDisplay } from "vuetify";
import { event } from "vue-gtag";

onMounted(() => {
  const stringLocalStorage = localStorage.getItem("vacante");

  if (stringLocalStorage) {
    const objetoLocalStore = JSON.parse(stringLocalStorage);
    Object.assign(vacante, objetoLocalStore);
  }

  if (!props.estadoFormulario) {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }
});
onUnmounted(() => {
  document.removeEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
});

const { smAndUp } = useDisplay();

const props = defineProps({
  estadoFormulario: {
    type: Boolean,
    default: false,
  },
});

// referencias
let vacante = reactive({
  cargo: null,
  empresa: null,
  descripcionEmpresa: null,
  descripcionVacante: null,
  tarea: null,
  tareas: [],
  requisitoExcluyente: null,
  requisitosExcluyentes: [],
  requisitoDeseable: null,
  requisitosDeseables: [],
  pagoMinimo: null,
  pagoMaximo: null,
  moneda: null,
  beneficio: null,
  beneficios: [],
  jornada: null,
  ubicacion: null,
  pais: null,
  direccion: null,
  contacto: null,
});

// metodos computados
const mostrarPais = computed(() => {
  return (
    vacante.modalidad?.nombre && vacante.modalidad?.nombre !== "Remoto global"
  );
});
const mostrarDireccion = computed(() => {
  return (
    !vacante.modalidad?.nombre?.includes("Remoto") &&
    vacante.pais &&
    vacante.direccion
  );
});
const generarHashtag = computed(() => {
  const hashtag = [];

  if (vacante.empresa) hashtag.push(capitalizarTexto(vacante.empresa));
  if (vacante.cargo?.nombre || vacante?.cargo)
    hashtag.push(capitalizarTexto(vacante.cargo?.nombre || vacante?.cargo));
  if (vacante.requisitosExcluyentes.length) {
    const indice =
      vacante.requisitosExcluyentes.length < 3
        ? vacante.requisitosExcluyentes.length
        : 3;

    for (let i = 0; i < indice; i++) {
      hashtag.push(capitalizarTexto(vacante.requisitosExcluyentes[i]));
    }
  }
  if (vacante.jornada?.nombre) hashtag.push(vacante.jornada?.hashtag);
  if (vacante.modalidad?.nombre)
    hashtag.push(capitalizarTexto(vacante.modalidad?.hashtag));
  if (mostrarPais.value)
    hashtag.push(capitalizarTexto(vacante.pais?.nombre || vacante?.pais));

  hashtag.push("SimpliPost");

  return hashtag;
});

// funciones
function formatearNumero(numero) {
  if (isNaN(numero)) return "Número inválido";

  let parteEntera = Math.floor(numero).toString();

  parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return parteEntera;
}
function capitalizarTexto(texto) {
  if (!texto) return;

  return texto
    .replace(/(^|\s)\S/g, (letra) => {
      return letra.toUpperCase();
    })
    .replace(/\s/g, "");
}
function copiarTexto() {
  const vistaPrevia = document.getElementById("vista-previa");
  const rango = document.createRange();

  rango.selectNode(vistaPrevia);

  const seleccion = window.getSelection();
  seleccion.removeAllRanges();
  seleccion.addRange(rango);

  try {
    document.execCommand("copy");
    console.log("Texto copiado exitosamente!");
  } catch (error) {
    console.log("Error al copiar el el texto de la vista previa", error);
  }

  seleccion.removeAllRanges();

  capturarAnalitica(
    "Copiar texto",
    "Copiar texto de la vacante en el portapapeles"
  );
}
function capturarAnalitica(etiqueta, descripcion) {
  event("click", {
    event_category: "Buttons",
    event_label: etiqueta,
    event_action: descripcion,
  });
}
</script>

<style scoped>
#vista-previa {
  background-color: rgba(var(--v-theme-surface-light));
  border-radius: 8px;
  padding: 16px 36px;
}

.desactivar-seleccion-vista-previa {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

ul {
  list-style-type: none;
}
</style>
