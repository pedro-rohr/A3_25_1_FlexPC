<template>
  <q-page class="flex flex-center bg-light-blue-1 pads text-light-blue-10">
    <div>
      <div class="textoCentro">
      <h1 class="textoCentro" style="font-weight: bold; font-size: 50px">Home Page</h1>
      <RouterLink to="/produto">vai a produto</RouterLink>
    </div>
    <div>
      <ListaProduto/>
      <CardProduto urlFoto="https://gru.ifsp.edu.br/images/phocagallery/galeria2/image03_grd.png"
      :preco=1000 :promo="100.01" titulo="Pinguins"/>
      <CardProduto urlFoto="https://static.vecteezy.com/ti/fotos-gratis/t2/36324708-ai-gerado-cenario-do-uma-tigre-caminhando-dentro-a-floresta-foto.jpg"
      :preco=2000 titulo="Tigre"/>
    </div>
  </div>
    
    
    
  </q-page>
</template>

<script>
import { RouterLink } from 'app/node_modules/vue-router/dist/vue-router'
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
  components: { RouterLink, CardProduto, ListaProduto }, CardProduto
})
</script>
<style>
.pads {
  padding: 20px;
}
.textoCentro {
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
}
</style>

<!-- <div>
  <h1>{{ dadoLocal }}</h1>
  <h3>{{ caracteres }} caracteres</h3>
  <h4>{{ bool }} {{ bool ? 'verdadeiro' : 'falso' }}</h4>
  <q-btn label="bool" @click="bool = !bool"></q-btn>
</div>
<q-btn label="troca" @click="dadoLocal = 'Novo valor'"></q-btn>

<img alt="Quasar logo" src="../assets/logo.png" style="width: 500px; height: 500px" />
<img alt="Pato" src="../assets/pato.gif" style="width: 500px; height: 500px" />
<img
  alt="Whimsicott"
  src="https://img.pokemondb.net/sprites/black-white/anim/shiny/whimsicott.gif"
  style="height: 500%"
/>
<img alt="Pato" src="../assets/quasar-logo-vertical.svg" style="width: 500px; height: 500px" />
<img alt="Quasar logo" src="paisagem.jpg" /> -->