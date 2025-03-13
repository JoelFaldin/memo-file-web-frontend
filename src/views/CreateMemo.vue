<script lang="ts" setup>
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'radix-vue';
import { toast } from 'vue-sonner';
import { ref } from 'vue';

import { parseForm } from '@/composables/stringUtils/checkForm';
import { useCreateMemo } from '@/composables/useMemo';
import FormSelect from '@/components/FormSelect.vue';
import FormInput from '@/components/FormInput.vue';
import { Button } from '@/components/ui/button';

const selectedValue = ref('');
const resetKey = ref(0);
const form = ref<HTMLFormElement | null>(null);
const formErrors = ref<Record<string, string>>({});

const { mutateAsync, isPending } = useCreateMemo();

const handleSubmitData = async (event: Event) => {
    event = event as SubmitEvent;
    let loading = null;

    try {
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        const values = {
            capital: parseFloat(data.capital.toString()),
            afecto: parseInt(data.afecto.toString()),
            total: parseFloat(data.total.toString()),
            emision: parseInt(data.emision.toString()),
            tipo: selectedValue.value,
            patente: data.patente.toString(),
            rut: data.rut.toString(),
            name: data.name.toString(),
            calle: data.calle.toString(),
            numero: data.numero.toString(),
            aclaratoria: data.aclaratoria?.toString(),
            periodo: data.periodo.toString(),
            fechaPagos: data.fechaPagos.toString(),
            giro: data.giro.toString(),
            agtp: data.agtp?.toString(),
            nombre_representante: data.nombreRepresentante.toString(),
            rut_representante: data.rutRepresentante.toString()
        }

        const res = parseForm(values);

        if (!res.success) {
            formErrors.value = {};
            res.error.issues.forEach((error) => {
                const field = error.path[0];
                formErrors.value[field] = error.message;
            });

            toast.error("Por favor, revisa los campos marcados en rojo.");
            return;
        } else {
            formErrors.value = {};
        }

        loading = toast.loading("Creando memorándum...");

        await mutateAsync(values);

        toast.dismiss(loading);
        toast.success("Memorándum creado con éxito!");

        selectedValue.value = '';
        resetKey.value++;
        form.value?.reset();
    } catch (error) {
        toast.error("Ha ocurrido un error al crear el memorándum.");
        console.error(error);
    }
}

const clearError = (name: string) => {
    if (formErrors.value[name]) {
        delete formErrors.value[name];
    }
}
</script>

<template>
    <div class="min-h-screen flex items-start justify-center">
        <div class="flex flex-col gap-y-8 items-center bg-card rounded-lg p-6 m-2 shadow-sm w-full bg-white dark:bg-inherit">
        <h3 class="text-2xl font-bold text-black dark:text-white">Guardar un nuevo memorándum</h3>

        <form ref="form" class="flex flex-col gap-y-4 w-full" @submit.prevent="handleSubmitData">
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
                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Rut del local" id="rut" type="text" name="rut" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.rut" class="text-red-500 text-sm">{{ formErrors.rut }}</p>
                        </span>

                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Nombre del local (nombre de fantasía)" id="name" type="text" name="name" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.name" class="text-red-500 text-sm">{{ formErrors.name }}</p>
                        </span>
                    </span>
                    <span class="flex flex-col gap-y-4 w-11/12 m-auto">
                        <span class="flex flex-col gap-y-1">
                            <FormSelect v-model:tipo="selectedValue" :reset-key="resetKey" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.tipo" class="text-red-500 text-sm">{{ formErrors.tipo }}</p>
                        </span>

                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Patente" id="patente" type="text" name="patente" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.patente" class="text-red-500 text-sm">{{ formErrors.patente }}</p>
                        </span>

                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Periodo" id="periodo" type="text" name="periodo" @clear:error="(name) => clearError(name)" >
                                <p class="text-sm text-slate-700 dark:text-slate-400 mt-1">Por ejemplo, 20251S (primer semestre del 2025)</p>
                            </FormInput>
                            <p v-if="formErrors.periodo" class="text-red-500 text-sm">{{ formErrors.periodo }}</p>
                        </span>
                    </span>
                    <span class="flex flex-col gap-y-4 w-11/12 m-auto">
                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Calle" id="calle" type="text" name="calle" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.calle" class="text-red-500 text-sm">{{ formErrors.calle }}</p>
                        </span>

                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Número" id="numero" type="text" name="numero" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.numero" class="text-red-500 text-sm">{{ formErrors.numero }}</p>
                        </span>

                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Aclaratoria" id="aclaratoria" type="text" name="aclaratoria" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.aclaratoria" class="text-red-500 text-sm">{{ formErrors.aclaratoria }}</p>
                        </span>
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
                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Capital" id="capital" type="number" name="capital" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.capital" class="text-red-500 text-sm">{{ formErrors.capital }}</p>
                        </span>

                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Afecto" id="afecto" type="number" name="afecto" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.afecto" class="text-red-500 text-sm">{{ formErrors.afecto }}</p>
                        </span>

                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Total" id="total" type="number" name="total" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.total" class="text-red-500 text-sm">{{ formErrors.total }}</p>
                        </span>

                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Emisión" id="emision" type="number" name="emision" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.emision" class="text-red-500 text-sm">{{ formErrors.emision }}</p>
                        </span>
                    </span>
                    <span class="flex flex-col gap-y-4 w-11/12 mx-auto">
                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Fecha de pago" id="fechaPago" type="text" name="fechaPagos" @clear:error="(name) => clearError(name)" >
                                <p class="text-sm text-slate-700 dark:text-slate-400 mt-1">Por ejemplo, 01-02-2025 (01 de febrero, 2025)</p>
                            </FormInput>
                            <p v-if="formErrors.fechaPagos" class="text-red-500 text-sm">{{ formErrors.fechaPagos }}</p>
                        </span>
                        <span class="flex flex-row gap-x-4">
                            <span class="flex flex-col gap-y-1">
                                <FormInput label="Giro" id="giro" type="text" name="giro" @clear:error="(name) => clearError(name)" />
                                <p v-if="formErrors.giro" class="text-red-500 text-sm">{{ formErrors.giro }}</p>
                            </span>

                            <span class="flex flex-col gap-y-1">
                                <FormInput label="AGTP" id="agtp" type="text" name="agtp" @clear:error="(name) => clearError(name)" />
                                <p v-if="formErrors.agtp" class="text-red-500 text-sm">{{ formErrors.agtp }}</p>
                            </span>
                        </span>
                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Nombre del representante" id="representante_name" type="text" name="nombreRepresentante" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.nombreRepresentante" class="text-red-500 text-sm">{{ formErrors.nombreRepresentante }}</p>
                        </span>

                        <span class="flex flex-col gap-y-1">
                            <FormInput label="Rut del representante" id="representante_rut" type="text" name="rutRepresentante" @clear:error="(name) => clearError(name)" />
                            <p v-if="formErrors.rutRepresentante" class="text-red-500 text-sm">{{ formErrors.rutRepresentante }}</p>
                        </span>
                    </span>
                </SplitterPanel>
            </SplitterGroup>

            <Button
                variant="outline"
                size="lg"
                :disabled="isPending"
                type="submit"
            >
                <span class="text-black dark:text-white">
                    Enviar datos
                </span>
            </Button>
        </form>
        </div>
    </div>
</template>
