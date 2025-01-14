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

</script>

<template>
  <div>
    <label for="file">Seleccione el archivo excel:</label>
    <input type="file" id="file" accept=".xls, .xlsx" @change="excel = $event.target.files[0]">

    <button @click="handleSubmit">Enviar</button>
  </div>
</template>

<style scoped>

</style>
