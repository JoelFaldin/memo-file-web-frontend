<script lang="ts" setup>
import { ref } from 'vue'

const excel = ref<File | null>(null)
const isLoading = ref(false)

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  const formData = new FormData()
  formData.append('excel', excel.value as unknown as Blob)

  try {
    isLoading.value = true

    const res = await fetch('http://localhost:3000/excel/upload', {
      method: 'POST',
      body: formData
    })

    console.log(res)
  } catch (error) {
    console.log('there was an error man')
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const storeFile = (event: Event) => {
    const target = event.target as HTMLInputElement

    excel.value = target.files![0]
     
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div :class="`flex flex-col items-center bg-card rounded-lg border border-slate-700 p-6 shadow-sm max-w-md w-full`">
      <h1 class="text-3xl font-bold">Subir archivo excel</h1>

      <section class="flex flex-col items-center mt-6 gap-y-4 my-4">
        <label for="file">Seleccione el archivo excel:</label>
        <input type="file" id="file" accept=".xls, .xlsx" @change="storeFile" />
      </section>
    
      <button :class="`h-[35px] mt-5 inline-flex items-center rounded-md ${isLoading ? 'bg-slate-500 hover:bg-slate-500 focus-visible:outline-slate-500 cursor-default' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'} px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`" @click="handleSubmit">Enviar datos</button>
    </div>
  </div>
</template>
