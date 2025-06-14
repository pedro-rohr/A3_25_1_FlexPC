<template>
  <div class="bg-light-blue-2">
    <div class="textoCentro text-light-blue-10">
      <h2 style="font-weight: bold; font-size: 40px">Produtos em promoção</h2>
    </div>
      <div class="container">
        <div class="row flexDisplay">
          <CardProduto
            v-for="prod in produtosComPromo"
            v-bind:key="prod"
            :id="prod.id"
            :titulo="prod.titulo"
            :urlFoto="prod.urlFoto"
            :preco="prod.preco"
            :promo="prod.promo"
            :descricao="prod.descricao"
          />
        </div>
      </div>
    
  </div>
</template>
<script>
import CardProduto from './CardProduto.vue'
export default {
  name: 'ListaProduto',
  components: { CardProduto },
  data() {
    return {
      produtos: new Array(),
    }
  },
  computed: {
    produtosComPromo() {
      return this.produtos.filter((prod) => prod.promo > 0)
    },
  },
  created() {
    fetch('http://localhost:3000/produtos')
      .then((res) => {
        res.json().then((dados) => {
          this.produtos = dados
        })
      })
      .catch()
  },
}
</script>
<style>
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
  flex-direction: column;
}
</style>
