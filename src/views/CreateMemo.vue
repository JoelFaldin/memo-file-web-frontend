<script lang="ts" setup>
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'radix-vue';
import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import { ref } from 'vue';

import FormInput from '@/components/FormInput.vue';
import FormSelect from '@/components/FormSelect.vue';
import { uploadMemo } from '@/api/memoService.ts';

const { mutate, isPending } = useMutation({
  mutationFn: uploadMemo,
  onMutate: async () => {
    const loading = toast.loading('Creando memorándum...');

    return { loading };
  },
  onSuccess: (_, __, context) => {
    toast.success('Memorándum creado con éxito!');
    toast.dismiss(context?.loading);

    userInputs.value.rut = '';
    userInputs.value.nombre = '';
    infoInputs.value.tipo = '';
    infoInputs.value.patente = '';
    infoInputs.value.periodo = '';
    directionInputs.value.calle = '';
    directionInputs.value.numero = '';
    directionInputs.value.aclaratoria = '';
    financesInputs.value.capital = '';
    financesInputs.value.afecto = '';
    financesInputs.value.total = '';
    financesInputs.value.emision = '';
    labelInputs.value.fechaPagos = '';
    labelInputs.value.giro = '';
    labelInputs.value.agtp = '';
  },
  onError: (error, _, context) => {
    toast.error('Ha ocurrido un error al crear el memorándum.');
    toast.dismiss(context?.loading);
    console.log(error);
  }
})

const userInputs = ref({ rut: '', nombre: '' });
const infoInputs = ref({ tipo: '', patente: '', periodo: '' });
const directionInputs = ref({ calle: '', numero: '', aclaratoria: '' });
const financesInputs = ref({ capital: '', afecto: '', total: '', emision: '' });
const labelInputs = ref({ fechaPagos: '', giro: '', agtp: '' });

const handleSubmitData = async () => {
  try {
    mutate({
        tipo: infoInputs.value.tipo,
        patente: infoInputs.value.patente,
        rut: userInputs.value.rut,
        nombre: userInputs.value.nombre,
        calle: directionInputs.value.calle,
        numero: directionInputs.value.numero,
        aclaratoria: directionInputs.value?.aclaratoria,
        periodo: infoInputs.value.periodo,
        capital: parseFloat(financesInputs.value.capital),
        afecto: parseInt(financesInputs.value.afecto),
        total: parseFloat(financesInputs.value.total),
        emision: parseInt(financesInputs.value.emision),
        fechaPagos: labelInputs.value.fechaPagos,
        giro: labelInputs.value.giro,
        agtp: labelInputs.value?.agtp
    });
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="min-h-screen flex items-start justify-center">
    <div class="flex flex-col items-center bg-card rounded-lg p-6 m-2 shadow-sm w-full bg-white dark:bg-inherit">
      <h3 class="text-2xl font-bold mb-5 text-black dark:text-white">Guardar un nuevo memorándum</h3>

      <div class="flex flex-col gap-y-4 w-full">
        <SplitterGroup
          id="group1"
          direction="horizontal"
        >
          <!-- Left panels: -->
          <SplitterPanel
            id="panel1"
            size="1fr"
            class="py-2 flex flex-col gap-y-4"
          >
            <span class="flex flex-col gap-y-4 w-11/12 m-auto">
              <FormInput label="Rut" id="rut" type="text" v-model:value="userInputs.rut" />
              <FormInput label="Nombre" id="name" type="text" v-model:value="userInputs.nombre" />
            </span>
            <span class="flex flex-col gap-y-4 w-11/12 m-auto">
              <FormSelect v-model:tipo="infoInputs.tipo" />
              <FormInput label="Patente" id="patente" type="text" v-model:value="infoInputs.patente" />
              <FormInput label="Periodo" id="periodo" type="text" v-model:value="infoInputs.periodo">
                <p class="text-sm text-slate-700 dark:text-slate-400 mt-1">Por ejemplo, 20251S (primer semestre del 2025)</p>
              </FormInput>
            </span>
            <span class="flex flex-col gap-y-4 w-11/12 m-auto">
              <FormInput label="Calle" id="calle" type="text" v-model:value="directionInputs.calle" />
              <FormInput label="Numero" id="numero" type="text" v-model:value="directionInputs.numero" />
              <FormInput label="Aclaratoria" id="aclaratoria" type="text" v-model:value="directionInputs.aclaratoria" />
            </span>
          </SplitterPanel>

          <SplitterResizeHandle
            id="splitter-group-1-resize-handle-1"
            class="w-2"
          />

          <!-- Right panels -->
          <SplitterPanel
            id="panel2"
            size="1fr"
            class="py-2 flex flex-col gap-y-4"
          >
            <span class="flex flex-col gap-y-4 w-11/12 mx-auto">
              <FormInput label="Capital" id="capital" type="number" v-model:value="financesInputs.capital" />
              <FormInput label="Afecto" id="afecto" type="number" v-model:value="financesInputs.afecto" />
              <FormInput label="Total" id="total" type="number" v-model:value="financesInputs.total" />
              <FormInput label="Emisión" id="emision" type="number" v-model:value="financesInputs.emision" />
            </span>
            <span class="flex flex-col gap-y-4 w-11/12 mx-auto">
              <FormInput label="Fecha de pago" id="fechaPago" type="text" v-model:value="labelInputs.fechaPagos">
                <p class="text-sm text-slate-700 dark:text-slate-400 mt-1">Por ejemplo, 01-02-2025 (01 de febrero, 2025)</p>
              </FormInput>
              <FormInput label="Giro" id="giro" type="text" v-model:value="labelInputs.giro" />
              <FormInput label="AGTP" id="agtp" type="text" v-model:value="labelInputs.agtp" />
            </span>
          </SplitterPanel>
        </SplitterGroup>
      </div>

      <button :class="`h-[35px] mt-5 inline-flex items-center rounded-md ${isPending ? 'bg-slate-500 hover:bg-slate-500 focus-visible:outline-slate-500 cursor-default' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'} px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`" :disabled="isPending" @click="handleSubmitData">Enviar datos</button>
    </div>
  </div>
</template>
