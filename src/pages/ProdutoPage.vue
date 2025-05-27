<template>
  <q-page class="flex flex-center">
    O Conteúdo da Página Produto {{ dadoLocal }}
    <img alt="Pato" src="../assets/pato.gif" style="width: 500px; height: 500px" />
    <img alt="Quasar logo" src="../assets/logo.png" style="width: 500px; height: 500px" />
    <img alt="Quasar logo" src="paisagem.jpg" />
  </q-page>
</template>

<script>
export default {
  name: 'ProdutoPage',
  data() {
    return {
      dadoLocal: 'dado local',
    }
  },
}
</script>
<style></style>
