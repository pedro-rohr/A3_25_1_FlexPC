<template>
  <q-page class="flex flex-center bg-light-blue-1 pads text-light-blue-10">
    <div class="container">
      <div class="textoCentro">
        <h1 class="textoCentro" style="font-weight: bold; font-size: 50px">Promoções</h1>
      </div>
      <div class="flexDisplay">
        <ListaPromo />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useCounterStore } from 'src/stores/example-store'
import CardProduto from '../components/CardProduto.vue'
import ListaPromo from 'src/components/ListaPromo.vue'

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
  components: { ListaPromo },
  CardProduto,
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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flexDisplay {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
