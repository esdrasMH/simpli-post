<template>
  <section>
    <div class="my-4">
      <v-btn
        id="limpiar-todos-campos"
        color="primary float-right"
        @click="resetearCampos"
        title="Limpiar todos los campos"
      >
        <v-icon icon="mdi-broom"></v-icon>
        <span v-if="smAndUp" class="ml-2">Limpiar campos</span>
      </v-btn>
      <h2>Edictor de la publicación</h2>
    </div>

    <v-form ref="formulario" v-model="formularioValido">
      <!-- seccion sobre la empresa -->
      <fieldset>
        <legend>Sobre la empresa</legend>
        <v-text-field
          id="nombre-empresa"
          variant="outlined"
          density="compact"
          class="mb-2"
          v-model.trim="vacante.empresa"
          label="Nombre de la empresa *"
          placeholder="Hooli"
          :rules="reglasValidacionFormulario.requerido"
          @focus="
            capturarAnalitica(
              'Focus',
              'Inputs',
              'Nombre de la empresa',
              'Llenar campo con nombre de la empresa'
            )
          "
        ></v-text-field>
        <v-textarea
          id="descripcion-empresa"
          variant="outlined"
          density="compact"
          v-model.trim="vacante.descripcionEmpresa"
          label="Descripción de la empresa"
          placeholder="Somos una empresa líder en el sector de la tecnología, especializada en el desarrollo de soluciones innovadoras para clientes de diversos sectores. Nos enorgullece ofrecer productos de alta calidad y experiencias de usuario excepcionales que impulsan el éxito de nuestros clientes en un mundo digitalmente conectado."
          @focus="
            capturarAnalitica(
              'Focus',
              'Inputs',
              'Descripción de la empresa',
              'Llenar campo con descripción de la empresa'
            )
          "
        ></v-textarea>
      </fieldset>

      <!-- seccion sobre la vacante -->
      <fieldset>
        <legend>Sobre la vacante</legend>
        <v-combobox
          id="nombre-vacante"
          variant="outlined"
          density="compact"
          class="mb-2"
          v-model.trim="vacante.cargo"
          label="Título de la vacante *"
          :items="cargos"
          item-title="nombre"
          item-value="id"
          :custom-filter="filtrarBusqueda"
          :rules="reglasValidacionFormulario.requerido"
          @focus="
            capturarAnalitica(
              'Focus',
              'Inputs',
              'Título de la vacante',
              'Llenar campo con título de la vacante'
            )
          "
        ></v-combobox>

        <v-textarea
          id="descripcion-vacante"
          variant="outlined"
          density="compact"
          v-model.trim="vacante.descripcionVacante"
          label="Descripción de la vacante"
          placeholder="Estamos buscando un Desarrollador Frontend Junior altamente talentoso y motivado para unirse a nuestro equipo de desarrollo. El candidato seleccionado será responsable de desarrollar e implementar interfaces de usuario atractivas y funcionales para nuestras aplicaciones web y plataformas digitales."
          @focus="
            capturarAnalitica(
              'Focus',
              'Inputs',
              'Descripción de la vacante',
              'Llenar campo con descripción de la vacante'
            )
          "
        ></v-textarea>

        <v-text-field
          id="responsabilidades-principales"
          variant="outlined"
          density="compact"
          v-model.trim="vacante.tarea"
          label="Responsabilidades principales *"
          placeholder="Desarrollar interfaces de usuario"
          :rules="validarReglaTareas"
          append-inner-icon="mdi-plus-circle"
          @click:append-inner="
            agregarTarea(
              'Click',
              'Inputs',
              'Responsabilidades principales',
              'Añadir responsabilidad principal'
            )
          "
          @keyup.enter="
            agregarTarea(
              'Keyup',
              'Inputs',
              'Responsabilidades principales',
              'Añadir responsabilidad principal'
            )
          "
          @focus="
            capturarAnalitica(
              'Focus',
              'Inputs',
              'Responsabilidades principales',
              'Llenar campo con responsabilidades principales'
            )
          "
        ></v-text-field>

        <v-chip-group v-if="vacante.tareas.length" column class="mt-n2 mb-1">
          <v-chip
            :id="`responsabilidad-principal-${index}`"
            v-for="(tarea, index) in vacante.tareas"
            closable
            @click:close="eliminarTarea(index)"
            :key="`chip-${tarea}`"
            >{{ tarea }}</v-chip
          >
        </v-chip-group>
      </fieldset>

      <!-- seccion sobre los requisitos -->
      <fieldset>
        <legend>Requisitos</legend>
        <v-text-field
          id="requisitos-excluyentes"
          variant="outlined"
          density="compact"
          class="mb-2"
          v-model.trim="vacante.requisitoExcluyente"
          label="Requisitos excluyentes *"
          placeholder="HTML"
          :rules="validarReglaRequisitos"
          append-inner-icon="mdi-plus-circle"
          @click:append-inner="
            agregarRequisitoExcluyente(
              'Click',
              'Inputs',
              'Requisitos excluyentes',
              'Añadir requisito excluyente'
            )
          "
          @keyup.enter="
            agregarRequisitoExcluyente(
              'Keyup',
              'Inputs',
              'Requisitos excluyentes',
              'Añadir requisito excluyente'
            )
          "
          @focus="
            capturarAnalitica(
              'Focus',
              'Inputs',
              'Requisitos excluyentes',
              'Llenar campo con requisitos excluyentes'
            )
          "
        ></v-text-field>

        <v-chip-group
          v-if="vacante.requisitosExcluyentes.length"
          column
          class="mt-n5 mb-3"
        >
          <v-chip
            :id="`requisito-excluyente-${index}`"
            v-for="(requisito, index) in vacante.requisitosExcluyentes"
            closable
            @click:close="eliminarRequisitoExcluyente(index)"
            :key="`chip-${requisito}`"
            >{{ requisito }}</v-chip
          >
        </v-chip-group>

        <v-text-field
          id="requisitos-deseables"
          variant="outlined"
          density="compact"
          v-model.trim="vacante.requisitoDeseable"
          label="Requisitos deseables"
          placeholder="Vue.js"
          append-inner-icon="mdi-plus-circle"
          @click:append-inner="
            agregarRequisitoDeseable(
              'Click',
              'Inputs',
              'Requisitos deseables',
              'Añadir requisito deseable'
            )
          "
          @keyup.enter="
            agregarRequisitoDeseable(
              'Keyup',
              'Inputs',
              'Requisitos deseables',
              'Añadir requisito deseable'
            )
          "
          @focus="
            capturarAnalitica(
              'Focus',
              'Inputs',
              'Requisitos deseables',
              'Llenar campo con requisitos deseables'
            )
          "
        ></v-text-field>

        <v-chip-group
          v-if="vacante.requisitosDeseables.length"
          column
          class="mt-n2 mb-1"
        >
          <v-chip
            :id="`requisito-deseable-${index}`"
            v-for="(requisito, index) in vacante.requisitosDeseables"
            closable
            @click:close="eliminarRequisitoDeseable(index)"
            :key="`chip-${requisito}`"
            >{{ requisito }}</v-chip
          >
        </v-chip-group>
      </fieldset>

      <!-- seccion sobre salario y beneficios -->
      <fieldset>
        <legend>Salario y beneficios</legend>
        <v-row no-gutters>
          <v-col cols="12" sm="4">
            <v-combobox
              id="moneda-pago"
              variant="outlined"
              density="compact"
              v-model.trim="vacante.moneda"
              label="Moneda"
              :items="monedas"
              item-title="nombre"
              item-value="id"
              :custom-filter="filtrarBusqueda"
              @update:modelValue="resetearCamposPago"
              @focus="
                capturarAnalitica(
                  'Focus',
                  'Inputs',
                  'Moneda de pago',
                  'Llenar campo con moneda de pago'
                )
              "
            ></v-combobox>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              id="renta-minima"
              variant="outlined"
              density="compact"
              :class="smAndUp ? 'mx-2' : 'mx-0'"
              v-model.number="vacante.pagoMinimo"
              label="Renta mínima mensual"
              type="number"
              :min="0"
              @focus="
                capturarAnalitica(
                  'Focus',
                  'Inputs',
                  'Renta mínima mensual',
                  'Llenar campo con renta mínima mensual'
                )
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              id="renta-maxima"
              variant="outlined"
              density="compact"
              class="mb-2"
              v-model.number="vacante.pagoMaximo"
              label="Renta máxima mensual"
              type="number"
              :min="0"
              :rules="reglasValidacionFormulario.rentaMaxima"
              @focus="
                capturarAnalitica(
                  'Focus',
                  'Inputs',
                  'Renta máxima mensual',
                  'Llenar campo con renta máxima mensual'
                )
              "
            ></v-text-field>
          </v-col>
        </v-row>

        <v-text-field
          id="beneficios-ofrecidos"
          variant="outlined"
          density="compact"
          v-model.trim="vacante.beneficio"
          label="Beneficios ofrecidos"
          placeholder="Seguro médico"
          append-inner-icon="mdi-plus-circle"
          @click:append-inner="
            agregarBeneficio(
              'Click',
              'Inputs',
              'Beneficios ofrecidos',
              'Añadir beneficio ofrecido'
            )
          "
          @keyup.enter="
            agregarBeneficio(
              'Keyup',
              'Inputs',
              'Beneficios ofrecidos',
              'Añadir beneficio ofrecido'
            )
          "
          @focus="
            capturarAnalitica(
              'Focus',
              'Inputs',
              'Beneficios ofrecidos',
              'Llenar campo con beneficios ofrecidos'
            )
          "
        ></v-text-field>

        <v-chip-group
          v-if="vacante.beneficios.length"
          column
          class="mt-n2 mb-1"
        >
          <v-chip
            :id="`beneficio-ofrecido-${index}`"
            v-for="(beneficio, index) in vacante.beneficios"
            closable
            @click:close="eliminarBeneficio(index)"
            :key="`chip-${beneficio}`"
            >{{ beneficio }}</v-chip
          >
        </v-chip-group>
      </fieldset>

      <!-- seccion sobre jornada, modalidad y modalidad -->
      <fieldset>
        <legend>Jornada, modalidad y ubicación</legend>
        <v-row no-gutters>
          <v-col cols="12" sm="4">
            <v-select
              id="tipo-jornada"
              variant="outlined"
              density="compact"
              class="mb-2"
              v-model="vacante.jornada"
              label="Tipo de jornada *"
              :items="jornadas"
              item-title="nombre"
              item-value="id"
              return-object
              :rules="reglasValidacionFormulario.requerido"
              @focus="
                capturarAnalitica(
                  'Focus',
                  'Inputs',
                  'Tipo de jornada',
                  'Llenar campo con tipo de jornada'
                )
              "
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              id="modalidad"
              variant="outlined"
              density="compact"
              :class="smAndUp ? 'mx-2' : 'mx-0'"
              v-model="vacante.modalidad"
              label="Modalidad *"
              :items="modalidades"
              item-title="nombre"
              item-value="id"
              return-object
              :rules="reglasValidacionFormulario.requerido"
              @focus="
                capturarAnalitica(
                  'Focus',
                  'Inputs',
                  'Modalidad de empleo',
                  'Llenar campo con modalidad de empleo'
                )
              "
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <v-combobox
              id="pais-origen"
              variant="outlined"
              density="compact"
              v-model.trim="vacante.pais"
              label="País *"
              :items="paises"
              item-title="nombre"
              item-value="id"
              :custom-filter="filtrarBusqueda"
              :disabled="validarActivacionCampoPais"
              :rules="validarReglaPais"
              @focus="
                capturarAnalitica(
                  'Focus',
                  'Inputs',
                  'País de empleo',
                  'Llenar campo con país de empleo'
                )
              "
            ></v-combobox>
          </v-col>
        </v-row>

        <v-text-field
          id="direccion"
          variant="outlined"
          density="compact"
          v-model.trim="vacante.direccion"
          label="Dirección *"
          placeholder="Av. Pdte. Kennedy 46654, Las Condes, Región Metropolitana"
          :disabled="!validarActivacionCampoDireccion"
          :rules="validarReglaDireccion"
          @focus="
            capturarAnalitica(
              'Focus',
              'Inputs',
              'Dirección de empleo',
              'Llenar campo con dirección de empleo'
            )
          "
        ></v-text-field>
      </fieldset>

      <!-- seccion sobre contacto -->
      <fieldset>
        <legend>Medio de contacto</legend>
        <v-text-field
          id="correo-contacto"
          variant="outlined"
          density="compact"
          v-model.trim="vacante.contacto"
          label="Correo de contacto *"
          placeholder="jdunn@hooli.xyz"
          :rules="reglasValidacionFormulario.correo"
          @focus="
            capturarAnalitica(
              'Focus',
              'Inputs',
              'Correo de contacto',
              'Llenar campo con correo de contacto'
            )
          "
        ></v-text-field>
      </fieldset>
    </v-form>
  </section>
</template>

<script setup>
import { onMounted, defineEmits, ref, reactive, computed, watch } from "vue";
import { useDisplay } from "vuetify";
import { event } from "vue-gtag";

onMounted(() => {
  const stringLocalStorage = localStorage.getItem("vacante");

  if (stringLocalStorage) {
    const objetoLocalStore = JSON.parse(stringLocalStorage);

    Object.assign(vacante, objetoLocalStore);
  }
});

const actualizarLocalStore = debounce((vacante) => {
  localStorage.setItem("vacante", JSON.stringify(vacante));
}, 1000);

const { smAndUp } = useDisplay();

const emit = defineEmits(["customEvent"]);

// referencias
const reglasValidacionFormulario = ref({
  requerido: [(v) => !!v || "Campo requerido ⚠️"],
  requeridoUnElemento: [(v) => !!v || "Debe añadir al menos un registro ⚠️"],
  rentaMaxima: [
    (v) => {
      if (v)
        return v >= vacante.pagoMinimo || "Debe ser mayor o igual al mínimo ⚠️";
      return true;
    },
  ],
  correo: [
    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Correo no valido ⚠️",
  ],
});
const cargos = ref([
  { nombre: "Analista de Datos", id: 1 },
  { nombre: "Analista de Negocios", id: 2 },
  { nombre: "Analista de Sistemas", id: 3 },
  { nombre: "Analista Financiero", id: 4 },
  { nombre: "Analista QA", id: 5 },
  { nombre: "Arquitecto de Software", id: 6 },
  { nombre: "Asistente Administrativo", id: 7 },
  { nombre: "Asistente de Marketing", id: 8 },
  { nombre: "Asistente de Recursos Humanos", id: 9 },
  { nombre: "Asistente de Ventas", id: 10 },
  { nombre: "Asistente Ejecutivo", id: 11 },
  { nombre: "Asistente Legal", id: 12 },
  { nombre: "Asistente Virtual", id: 13 },
  { nombre: "Auxiliar de Contabilidad", id: 14 },
  { nombre: "Chef Ejecutivo", id: 15 },
  { nombre: "Cocinero", id: 16 },
  { nombre: "Community Manager", id: 17 },
  { nombre: "Consultor de Negocios", id: 18 },
  { nombre: "Contador Financiero", id: 19 },
  { nombre: "Desarrollador Backend", id: 20 },
  { nombre: "Desarrollador Frontend", id: 21 },
  { nombre: "Desarrollador Fullstack", id: 22 },
  { nombre: "Desarrollador Web", id: 23 },
  { nombre: "Diseñador de Experiencia de Usuario (UX)", id: 24 },
  { nombre: "Diseñador de Interfaz de Usuario (UI)", id: 25 },
  { nombre: "Diseñador de Producto", id: 26 },
  { nombre: "Diseñador Gráfico", id: 27 },
  { nombre: "Especialista en Marketing Digital", id: 28 },
  { nombre: "Especialista en Recursos Humanos", id: 29 },
  { nombre: "Especialista en Redes Sociales", id: 30 },
  { nombre: "Especialista en SEO", id: 31 },
  { nombre: "Gerente de Operaciones", id: 32 },
  { nombre: "Gerente de Proyecto", id: 33 },
  { nombre: "Gerente de Recursos Humanos", id: 34 },
  { nombre: "Gerente Financiero", id: 35 },
  { nombre: "Ingeniero Civil", id: 36 },
  { nombre: "Ingeniero de Sistemas", id: 37 },
  { nombre: "Ingeniero Eléctrico", id: 38 },
  { nombre: "Ingeniero Industrial", id: 39 },
  { nombre: "Ingeniero Mecánico", id: 40 },
  { nombre: "Instructor de Fitness", id: 41 },
  { nombre: "Instructor de Idiomas", id: 42 },
  { nombre: "Instructor de Yoga", id: 43 },
  { nombre: "Investigador de Mercado", id: 44 },
  { nombre: "Médico Especialista", id: 45 },
  { nombre: "Médico General", id: 46 },
  { nombre: "Médico Residente", id: 47 },
  { nombre: "Médico Veterinario", id: 48 },
  { nombre: "Project Manager", id: 49 },
  { nombre: "Recepcionista", id: 50 },
  { nombre: "Técnico de Soporte", id: 51 },
  { nombre: "Traductor", id: 52 },
  { nombre: "Vendedor Internacional", id: 53 },
]);
const monedas = ref([
  { id: "PAB", nombre: "Balboa panameño" },
  { id: "VES", nombre: "Bolívar venezolano" },
  { id: "BOB", nombre: "Boliviano" },
  { id: "CRC", nombre: "Colón costarricense" },
  { id: "NIO", nombre: "Córdoba nicaragüense" },
  { id: "CAD", nombre: "Dólar canadiense" },
  { id: "USD", nombre: "Dólar estadounidense" },
  { id: "EUR", nombre: "Euro" },
  { id: "PYG", nombre: "Guaraní paraguayo" },
  { id: "HNL", nombre: "Lempira hondureño" },
  { id: "ARS", nombre: "Peso argentino" },
  { id: "CLP", nombre: "Peso chileno" },
  { id: "COP", nombre: "Peso colombiano" },
  { id: "MXN", nombre: "Peso mexicano" },
  { id: "UYU", nombre: "Peso uruguayo" },
  { id: "GTQ", nombre: "Quetzal guatemalteco" },
  { id: "BRL", nombre: "Real brasileño" },
  { id: "PEN", nombre: "Sol peruano" },
]);
const jornadas = ref([
  { id: "1", nombre: "Completa", hashtag: "JornadaCompleta" },
  { id: "2", nombre: "Media", hashtag: "JornadaMedia" },
  { id: "3", nombre: "Contrato", hashtag: "TrabajoPorContrato" },
  { id: "4", nombre: "Prácticas", hashtag: "Prácticas" },
  { id: "5", nombre: "Temporal", hashtag: "TrabajoTemporal" },
]);
const modalidades = ref([
  { id: "1", nombre: "Remoto global", hashtag: "RemotoGlobal" },
  { id: "2", nombre: "Remoto local", hashtag: "RemotoLocal" },
  { id: "3", nombre: "Hibrida", hashtag: "ModalidadHibrida" },
  { id: "4", nombre: "Presencial", hashtag: "ModalidadPresencial" },
]);
const paises = ref([
  { nombre: "Argentina", id: "AR" },
  { nombre: "Bolivia", id: "BO" },
  { nombre: "Brasil", id: "BR" },
  { nombre: "Chile", id: "CL" },
  { nombre: "Colombia", id: "CO" },
  { nombre: "Costa Rica", id: "CR" },
  { nombre: "Ecuador", id: "EC" },
  { nombre: "El Salvador", id: "SV" },
  { nombre: "Guatemala", id: "GT" },
  { nombre: "Honduras", id: "HN" },
  { nombre: "México", id: "MX" },
  { nombre: "Nicaragua", id: "NI" },
  { nombre: "Panamá", id: "PA" },
  { nombre: "Paraguay", id: "PY" },
  { nombre: "Perú", id: "PE" },
  { nombre: "Uruguay", id: "UY" },
  { nombre: "Venezuela", id: "VE" },
]);
const formulario = ref();
const formularioValido = ref(false);
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
  modalidad: null,
  pais: null,
  direccion: null,
  contacto: null,
});

// metodos computados
const validarReglaTareas = computed(() => {
  return !vacante.tareas.length
    ? reglasValidacionFormulario.value.requeridoUnElemento
    : [];
});
const validarReglaRequisitos = computed(() => {
  return !vacante.requisitosExcluyentes.length
    ? reglasValidacionFormulario.value.requeridoUnElemento
    : [];
});
const validarReglaPais = computed(() => {
  return vacante.modalidad?.nombre !== "Remoto global"
    ? reglasValidacionFormulario.value.requerido
    : [];
});
const validarReglaDireccion = computed(() => {
  return !vacante.modalidad?.nombre?.includes("Remoto")
    ? reglasValidacionFormulario.value.requerido
    : [];
});
const validarActivacionCampoPais = computed(() => {
  return !vacante.modalidad || vacante.modalidad?.nombre === "Remoto global";
});
const validarActivacionCampoDireccion = computed(() => {
  return (
    !vacante.modalidad?.nombre?.includes("Remoto") && vacante.pais !== null
  );
});

// observadores
watch(vacante, (valorNuevo) => {
  actualizarLocalStore(valorNuevo);
});
watch(
  () => vacante.pagoMinimo,
  (valorNuevo) => {
    if (valorNuevo > vacante.pagoMaximo && vacante.pagoMaximo) {
      vacante.pagoMaximo = valorNuevo;
    }
  }
);
watch(formularioValido, (valorNuevo) => {
  emit("customEvent", valorNuevo);
});

// funciones
function debounce(funcion, demora) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      funcion.apply(this, args);
    }, demora);
  };
}
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
function resetearCampos() {
  formulario.value.reset();
  vacante.tareas = [];
  vacante.requisitosExcluyentes = [];
  vacante.requisitosDeseables = [];
  vacante.beneficios = [];
  formulario.value.resetValidation();

  capturarAnalitica(
    "Click",
    "Buttons",
    "Limpiar campos",
    "Limpiar todos los campos"
  );
}
function filtrarBusqueda(undefined, queryBusqueda, monedas) {
  const nombreMonedaNormalizada = normalizar(monedas.raw.nombre);
  const queryBusquedaNormalizada = normalizar(queryBusqueda);

  return nombreMonedaNormalizada.indexOf(queryBusquedaNormalizada) > -1;
}
function agregarTarea(evento, categoria, etiqueta, descripcion) {
  if (!vacante.tarea) return;

  vacante.tareas.push(vacante.tarea);
  vacante.tarea = "";
  capturarAnalitica(evento, categoria, etiqueta, descripcion);
}
function eliminarTarea(indice) {
  vacante.tareas.splice(indice, 1);
}
function agregarRequisitoExcluyente(evento, categoria, etiqueta, descripcion) {
  if (!vacante.requisitoExcluyente) return;

  vacante.requisitosExcluyentes.push(vacante.requisitoExcluyente);
  vacante.requisitoExcluyente = "";
  capturarAnalitica(evento, categoria, etiqueta, descripcion);
}
function eliminarRequisitoExcluyente(indice) {
  vacante.requisitosExcluyentes.splice(indice, 1);
}
function agregarRequisitoDeseable(evento, categoria, etiqueta, descripcion) {
  if (!vacante.requisitoDeseable) return;

  vacante.requisitosDeseables.push(vacante.requisitoDeseable);
  vacante.requisitoDeseable = "";
  capturarAnalitica(evento, categoria, etiqueta, descripcion);
}
function eliminarRequisitoDeseable(indice) {
  vacante.requisitosDeseables.splice(indice, 1);
}
function resetearCamposPago() {
  vacante.pagoMinimo = null;
  vacante.pagoMaximo = null;
  formulario.value.resetValidation(vacante.pagoMaximo);
}
function agregarBeneficio(evento, categoria, etiqueta, descripcion) {
  if (!vacante.beneficio) return;

  vacante.beneficios.push(vacante.beneficio);
  vacante.beneficio = "";
  capturarAnalitica(evento, categoria, etiqueta, descripcion);
}
function eliminarBeneficio(indice) {
  vacante.beneficios.splice(indice, 1);
}
function capturarAnalitica(evento, categoria, etiqueta, descripcion) {
  event(evento, {
    event_category: categoria,
    event_label: etiqueta,
    event_action: descripcion,
  });
}
</script>

<style scoped>
fieldset {
  margin-bottom: 16px;
  padding: 8px 24px;
  background-color: rgb(var(--v-theme-surface-light));
  border: none;
  border-radius: 8px;
}
</style>
