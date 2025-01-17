<script lang="ts" setup>
import { ref } from 'vue'

const tipo = ref(null)
const patente = ref(null)
const rut = ref(null)
const nombre = ref(null)
const calle = ref(null)
const numero = ref(null)
const aclaratoria = ref(null)
const periodo = ref(null)
const capital = ref(null)
const afecto = ref(null)
const fechaPagos = ref(null)
const giro = ref(null)
const agtp = ref(null)

const handleSubmitData = async (event: Event) => {
  event.preventDefault()

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
        fechaPagos: fechaPagos.value,
        giro: giro.value,
        agtp: agtp.value
      })
    })

    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
    <form>
    <h2>Guardar un memo</h2>

    <label for="tipo">Tipo</label>
    <input id="tipo" v-model="tipo" />

    <label for="patente">Patente</label>
    <input id="patente" v-model="patente" />

    <label for="rut">Rut</label>
    <input id="rut" v-model="rut" />

    <label for="nombre">Nombre</label>
    <input id="nombre" v-model="nombre" />

    <label for="calle">Calle</label>
    <input id="calle" v-model="calle" />

    <label for="numero">Numero</label>
    <input id="numero" v-model="numero" />

    <label for="aclaratoria">Aclaratoria</label>
    <input id="aclaratoria" v-model="aclaratoria" />

    <label for="periodo">Periodo</label>
    <input id="periodo" v-model="periodo" />
    
    <label for="capital">Capital</label>
    <input id="capital" v-model="capital" />

    <label for="afecto">Afecto</label>
    <input id="afecto" v-model="afecto" type="number" />

    <label for="fechaPagos">Fecha de pago</label>
    <input id="fechaPagos" v-model="fechaPagos" />

    <label for="giro">Giro</label>
    <input id="giro" v-model="giro" />

    <label for="agtp">Agtp</label>
    <input id="agtp" v-model="agtp" />

    <button @click="handleSubmitData">Enviar datos</button>
  </form>
</template>
