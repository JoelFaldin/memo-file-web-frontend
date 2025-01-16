<script lang="ts">
import { ref } from 'vue';

const patente = ref(null)

const searchMemo = async (event: Event) => {
  event.preventDefault()

  if (!patente.value) {
    alert('No has indicado una patente!')
    return
  }

  try {
    const res = await fetch(`http://localhost:3000/memo/${patente.value}`)
    const data = await res.json()

    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export default {
  name: 'UpdateMemo',
  methods: {
    searchMemo
  },
  setup() {
    return {
      patente
    }
  }
}
</script>

<template>
    <form class="form">
        <label for="searchMemo">Buscar memo (por patente):</label>
        <input id="searchMemo" type="text" v-model="patente">

        <button @click="searchMemo">Buscar</button>
    </form>
</template>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
</style>