<template>
  <q-page class="flex flex-center">
    <div>
      <h1>{{ dadoLocal }}</h1>
      <h3>{{ caracteres }} caracteres</h3>
      <h4>{{ bool }} {{ bool ? 'verdadeiro' : 'falso' }}</h4>
      <q-btn label="bool" @click="bool = !bool"></q-btn>
    </div>
    <div><RouterLink to="/produto">vai a produto</RouterLink></div>
    <q-btn label="troca" @click="dadoLocal = 'Novo valor'"></q-btn>

    <img alt="Quasar logo" src="../assets/logo.png" style="width: 500px; height: 500px" />
    <img alt="Pato" src="../assets/pato.gif" style="width: 500px; height: 500px" />
    <img
      alt="Whimsicott"
      src="https://img.pokemondb.net/sprites/black-white/anim/shiny/whimsicott.gif"
      style="height: 500%"
    />
    <img alt="Pato" src="../assets/quasar-logo-vertical.svg" style="width: 500px; height: 500px" />
    <img alt="Quasar logo" src="paisagem.jpg" />
  </q-page>
</template>

<script>
import { RouterLink } from 'app/node_modules/vue-router/dist/vue-router'
import { defineComponent } from 'vue'
import { useCounterStore } from 'src/stores/example-store'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      dadoLocal: 'Outro dado local',
      bool: true,
    }
  },
  computed: {
    caracteres() {
      return this.dadoLocal.length
    },
  },
  created() {
    let store = useCounterStore()
    this.dadoLocal = store.dado
  },
  components: { RouterLink },
})
</script>
