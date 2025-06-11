<template>
  <q-page class="flex flex-center bg-light-blue-1 pads text-light-blue-10">
    <div>
      <div class="textoCentro">
      <h1 class="textoCentro" style="font-weight: bold; font-size: 50px">Home Page</h1>
    </div>
    <div>
      <ListaProduto/>
    </div>
  </div>



  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useCounterStore } from 'src/stores/example-store'
import CardProduto from '../components/CardProduto.vue'
import ListaProduto from 'src/components/ListaProduto.vue'


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
  components: { ListaProduto }, CardProduto
})
</script>
<style scoped>
.pads {
  padding: 20px;
}
.textoCentro {
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
}
</style>
