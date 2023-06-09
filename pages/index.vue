<template>
<div class="ma-8">
  <h1>Hallo!</h1>
  <p>
    Diese Anwendung soll Sie dabei unterstützen, ein passendes Threat-Modeling Tool zu finden. Beanworten Sie
    alle Fragen um Ihr Ergebnis zu erhalten.
  </p>
  <v-btn to="/threathelper" class="my-7"  color="primary">Quiz starten</v-btn>
</div>
</template>

<script setup lang="ts">

import {useAsyncData} from "#imports";

const { data, pending } = useAsyncData('tools', () => queryContent('/tools').findOne())

</script>



<style scoped>

</style>