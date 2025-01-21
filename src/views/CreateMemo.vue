<script lang="ts" setup>
import { Label, SelectContent, SelectGroup, SelectItem, SelectItemIndicator, SelectItemText, SelectLabel, SelectPortal, SelectRoot, SelectScrollDownButton, SelectScrollUpButton, SelectTrigger, SelectValue, SelectViewport } from 'radix-vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

import { Button } from '@/components/ui/button';

const rut = ref('')
const nombre = ref('')
const tipo = ref('')
const patente = ref('')
const periodo = ref('')
const calle = ref('')
const numero = ref('')
const aclaratoria = ref('')
const capital = ref('')
const afecto = ref('')
const total = ref('')
const emision = ref('')
const fechaPagos = ref('')
const giro = ref('')
const agtp = ref('')

// const formSchema = toTypedSchema(z.object({
//   rut: z.string(),
//   nombre: z.string(),
//   tipo: z.enum(["COMER", "PROFE", "INDUS", "ALCOH", "MEF"]),
//   patente: z.string().length(8),
//   periodo: z.string().length(6),
//   capital: z.number(),
//   afecto: z.number().min(0).max(100),
//   total: z.number(),
//   emision: z.number().min(0),
//   giro: z.string(),
//   agtp: z.string(),
//   fechaPago: z.string()
// }))

const types = ["COMER", "PROFE", "INDUS", "ALCOH", "MEF"]

const handleSubmitData = async () => {
  const fecha = fechaPagos.value.split('').filter(char => char != '-').join('');
  // console.log(fechaPagos.value.split('').filter(char => char != '-').join(''))

  try {
    const res = await fetch('http://localhost:3000/memo/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        tipo: tipo.value,
        patente: patente.value,
        rut: rut.value,
        nombre: nombre.value,
        calle: calle.value,
        numero: numero.value,
        aclaratoria: aclaratoria?.value,
        periodo: periodo.value,
        capital: capital.value,
        afecto: afecto.value,
        total: total.value,
        emision: parseInt(emision.value),
        fechaPagos: parseInt(fecha),
        giro: giro.value,
        agtp: agtp.value
      })
    })

    const response = await res.json();
    console.log(response);
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-start justify-center p-4">
    <div class="flex flex-col items-center bg-card rounded-lg border border-slate-700 p-6 shadow-sm w-2/4">
      <h3 class="text-2xl font-bold mb-5">Guardar un nuevo memorándum</h3>

      <div class="flex flex-col gap-y-4 w-full">
        <section class="flex flex-col w-full">
          <Label class="text-[15px] font-semibold leading-[35px] text-white" for="rut">Rut</Label>
          <input
            id="rut"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            v-model="rut"
          />
        </section>
        <section class="flex flex-col w-full">
          <Label for="name">Nombre</Label>
          <input
            id="name"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            v-model="nombre"
          />
        </section>
        <section class="flex flex-col w-full">
          <Label for="tipo">Tipo</Label>
          <SelectRoot v-model="tipo">
            <SelectTrigger
              class="border b-slate-100 inline-flex min-w-[160px] items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] shadow-[0_2px_10px] shadow-black/10 hover:bg-gray-800 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-slate-500"
            >
              <SelectValue placeholder="Selecciona un tipo de patente..." />
              <Icon
                icon="radix-icons:chevron-down"
                class="h-3.5 w-3.5"
              />
            </SelectTrigger>

            <SelectPortal>
              <SelectContent
                class="min-w-[160px] bg-gray-800 rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
              >
                <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                  <Icon icon="radix-icons:chevron-up" />
                </SelectScrollUpButton>

                <SelectViewport class="p-[5px]">
                  <SelectLabel class="px-[25px] text-xs leading-[25px] text-slate-400">
                    Tipos
                  </SelectLabel>
                  <SelectGroup>
                    <SelectItem
                      v-for="(type, index) in types"
                      :key="index"
                      class="text-[13px] leading-none text-white rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-slate-700 data-[highlighted]:text-indigo-400"
                      :value="type"
                    >
                      <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                        <Icon icon="radix-icons:check" />
                      </SelectItemIndicator>
                      <SelectItemText>
                        {{ type }}
                      </SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                </SelectViewport>

                <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                  <Icon icon="radix-icons:chevron-down" />
                </SelectScrollDownButton>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </section>
        <section class="flex flex-col w-full">
          <Label for="patente">Patente</Label>
          <input
            id="patente"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            v-model="patente"
            />
        </section>
        <section class="flex flex-col w-full">
          <Label for="periodo">Periodo</Label>
          <input
            id="periodo"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            v-model="periodo"
            />
          <p class="text-sm text-slate-400 mt-1">Por ejemplo, 20251S (primer semestre del 2025)</p>
        </section>
        <section class="flex flex-col w-full">
          <Label for="calle">Calle</Label>
          <input
            id="calle"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            v-model="calle"
            />
        </section>
        <section class="flex flex-col w-full">
          <Label for="numero">Número</Label>
          <input
            id="numero"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            v-model="numero"
            />
        </section>
        <section class="flex flex-col w-full">
          <Label for="aclaratoria">Aclaratoria</Label>
          <input
            id="aclaratoria"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            v-model="aclaratoria"
            />
        </section>
        <section class="flex flex-col w-full">
          <Label for="capital">Capital</Label>
          <input
            id="capital"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="number"
            v-model="capital"
            />
        </section>
        <section class="flex flex-col w-full">
          <Label for="afecto">Afecto</Label>
          <input
            id="afecto"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="number"
            v-model="afecto"
            />
        </section>
        <section class="flex flex-col w-full">
          <Label for="total">Total</Label>
          <input
            id="total"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="number"
            v-model="total"
            />
        </section>
        <section class="flex flex-col w-full">
          <Label for="emision">Emisión</Label>
          <input
            id="emision"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="number"
            v-model="emision"
            />
        </section>
        <section class="flex flex-col w-full">
          <Label for="fechaPago">Fecha de pago</Label>
          <input
            id="fechaPago"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            v-model="fechaPagos"
            />
          <p class="text-sm text-slate-400 mt-1">Por ejemplo, 01-02-2025 (01 de febrero, 2025)</p>
        </section>
        <section class="flex flex-col w-full">
          <Label for="giro">Giro</Label>
          <input
            id="giro"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            v-model="giro"
            />
        </section>
        <section class="flex flex-col w-full">
          <Label for="agtp">AGTP</Label>
          <input
            id="agtp"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            v-model="agtp"
            />
        </section>
      </div>

      <Button class="mt-8" @click="handleSubmitData">Enviar datos</Button>
    </div>
  </div>
</template>
