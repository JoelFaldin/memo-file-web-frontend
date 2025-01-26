import { useMutation } from "@tanstack/vue-query";
import { toast } from 'vue-sonner';
import type { Ref } from "vue";

import { uploadMemo } from '@/api/memoService.ts';

interface createMemoInterface {
  userInputs: Ref<{ rut: string, nombre: string }>,
  infoInputs: Ref<{ tipo: string, patente: string, periodo: string }>,
  directionInputs: Ref<{ calle: string, numero: string, aclaratoria: string }>,
  financesInputs: Ref<{ capital: string, afecto: string, total: string, emision: string }>,
  labelInputs: Ref<{ fechaPagos: string, giro: string, agtp: string }>,
}

export const useCreateMemo = ({ userInputs, infoInputs, directionInputs, financesInputs, labelInputs }: createMemoInterface) => {
  return useMutation({
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
}