<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/update">Update memo</RouterLink>
      </nav>
    </div>
  </header>


  <RouterView />
</template>

<style scoped>

</style>
