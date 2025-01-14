<script setup lang="ts">

import { ref } from 'vue'

const excel = ref(null)

const handleSubmit = async (e) => {
  e.preventDefault()

  const formData = new FormData()
  formData.append('excel', excel.value as unknown as Blob)

  try {
    const res = await fetch('http://localhost:3000/excel', {
      method: 'POST',
      body: formData
    })

    console.log(res)
  } catch (error) {
    console.log('there was an error man')
    console.log(error)
  }
}

const storeFile = (event) => {
  excel.value = event.target.files[0]
}

</script>

<template>
  <div>
    <label for="file">Seleccione el archivo excel:</label>
    <input type="file" id="file" accept=".xls, .xlsx" @change="storeFile" />

    <button @click="handleSubmit">Enviar</button>
  </div>
</template>

<style scoped>

</style>
