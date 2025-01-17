<script lang="ts" setup>
import { ref } from 'vue'

const excel = ref<File | null>(null)

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  const formData = new FormData()
  formData.append('excel', excel.value as unknown as Blob)

  try {
    const res = await fetch('http://localhost:3000/excel/upload', {
      method: 'POST',
      body: formData
    })

    console.log(res)
  } catch (error) {
    console.log('there was an error man')
    console.log(error)
  }
}

const storeFile = (event: Event) => {
    const target = event.target as HTMLInputElement

    excel.value = target.files![0]
     
}
</script>

<template>
    <div>
        <h1>Subir archivo excel</h1>

        <label for="file">Seleccione el archivo excel:</label>
        <input type="file" id="file" accept=".xls, .xlsx" @change="storeFile" />

        <button @click="handleSubmit">Enviar</button>
   </div>
</template>
