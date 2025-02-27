import { keepPreviousData, useInfiniteQuery, useMutation, useQuery } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import type { Ref } from 'vue';

import { fetchInfiniteMemos, getMemos, uploadMemo } from '@/api/memoService.ts';

interface createMemoInterface {
  userInputs: Ref<{ rut: string, nombre: string }>,
  infoInputs: Ref<{ tipo: string, patente: string, periodo: string }>,
  directionInputs: Ref<{ calle: string, numero: string, aclaratoria: string }>,
  financesInputs: Ref<{ capital: string, afecto: string, total: string, emision: string }>,
  labelInputs: Ref<{ fechaPagos: string, giro: string, agtp: string }>,
  representantInputs: Ref<{ nombre: string, rut: string }>,
}

export const useSearchMemo = (
  page: Ref<number>,
  enabled: Ref<boolean>,
  rol: Ref<string>,
  rut: Ref<string>,
  direction: Ref<string>,
) => {
  return useQuery({
    queryKey: ['searchedMemos', page],
    queryFn: () => getMemos(rol, rut, direction, page),
    enabled: enabled,
    placeholderData: keepPreviousData,
  })
}

export const useInfiniteSearch = (
  rol: Ref<string>,
  rut: Ref<string>,
  direction: Ref<string>,
  enableInfinite: Ref<boolean>,
) => {
  return useInfiniteQuery({
    queryKey: ['infiniteMemos'],
    queryFn: ({ pageParam = 0 }) =>
      fetchInfiniteMemos(rol.value, rut.value, direction.value, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.page;
    },
    initialPageParam: 0,
    enabled: enableInfinite,
  })
}

export const useCreateMemo = ({
  userInputs,
  infoInputs,
  directionInputs,
  financesInputs,
  labelInputs,
  representantInputs,
}: createMemoInterface) => {
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
      representantInputs.value.nombre = '';
      representantInputs.value.rut = '';
    },
    onError: (error, _, context) => {
      toast.error('Ha ocurrido un error al crear el memorándum.');
      toast.dismiss(context?.loading);
      console.log(error);
    },
  })
}
