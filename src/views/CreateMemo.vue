<script lang="ts" setup>
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'radix-vue';
import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import { ref } from 'vue';

import UserSection from '@/components/FormUserSection.vue';
import InfoSection from '@/components/FormInfoSection.vue';
import DirectionSection from '@/components/FormDirectionSection.vue';
import FinancesSection from '@/components/FormFinancesSection.vue';
import LabelSection from '@/components/FormLabelSection.vue';

interface NewMemoInterface {
  tipo: string,
  patente: string,
  rut: string,
  nombre: string,
  calle: string,
  numero: string,
  aclaratoria: string,
  periodo: string,
  capital: number,
  afecto: number,
  total: number,
  emision: number,
  fechaPagos: number,
  giro: string,
  agtp: string,
}

const uploadMemo = async (newMemo: NewMemoInterface) => {
  try {
    const res = await fetch('http://localhost:3000/memo/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newMemo)
    });
    const response = await res.json();

    if (!res.ok) {
      return Promise.reject(response.message);
    }

    return response;
  } catch(error) {
    return Promise.reject(error);
  }
}

const { isPending, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: uploadMemo,
  onSuccess: () => {
    toast.success('Memorándum creado con éxito!');

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
  onError: (error) => {
    console.log(error)
    toast.error('Ha ocurrido un error al crear el memorándum.')
  }
})

const userInputs = ref({ rut: '', nombre: '' });
const infoInputs = ref({ tipo: '', patente: '', periodo: '' });
const directionInputs = ref({ calle: '', numero: '', aclaratoria: '' });
const financesInputs = ref({ capital: '', afecto: '', total: '', emision: '' });
const labelInputs = ref({ fechaPagos: '', giro: '', agtp: '' });

const isLoading = ref(false);

const handleSubmitData = async () => {
  const fecha = labelInputs.value.fechaPagos.split('').filter(char => char != '-').join('');

  try {
    isLoading.value = true;

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
        fechaPagos: parseInt(fecha),
        giro: labelInputs.value.giro,
        agtp: labelInputs.value?.agtp
    });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-start justify-center">
    <div class="flex flex-col items-center bg-card rounded-lg p-6 shadow-sm w-full">
      <h3 class="text-2xl font-bold mb-5">Guardar un nuevo memorándum</h3>

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
            <UserSection v-model:rut="userInputs.rut" v-model:nombre="userInputs.nombre" />
            <InfoSection v-model:tipo="infoInputs.tipo" v-model:patente="infoInputs.patente" v-model:periodo="infoInputs.periodo" />
            <DirectionSection v-model:calle="directionInputs.calle" v-model:numero="directionInputs.numero" v-model:aclaratoria="directionInputs.aclaratoria" />
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
            <FinancesSection v-model:capital="financesInputs.capital" v-model:afecto="financesInputs.afecto" v-model:total="financesInputs.total" v-model:emision="financesInputs.emision" />
            <LabelSection v-model:fechaPagos="labelInputs.fechaPagos" v-model:giro="labelInputs.giro" v-model:agtp="labelInputs.agtp" />      
          </SplitterPanel>
        </SplitterGroup>
      </div>

      <button :class="`h-[35px] mt-5 inline-flex items-center rounded-md ${isLoading ? 'bg-slate-500 hover:bg-slate-500 focus-visible:outline-slate-500 cursor-default' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'} px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`" @click="handleSubmitData">Enviar datos</button>
    </div>
  </div>
</template>
