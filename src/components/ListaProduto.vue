<template>
  <div class="container bg-light-blue-2 pads borderRadius">
    <div class="textoCentro text-light-blue-10">
      <h2 style="font-weight: bold; font-size: 40px">Produtos</h2>
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 centralizar">
      <CardProduto
        v-for="prod in produtos"
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
.container {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
}
.pads {
  padding: 20px;
}
.textoCentro {
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
}
.borderRadius {
  border-radius: 15px;
}
.centralizar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
