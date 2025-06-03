<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card-produto">
      <q-img :src="produto.urlFoto" class="flexDisplay" ></q-img>
      <div class="bg-light-blue-8 flexDisplay">
        <div class="text-h6 text-white layout">{{ produto.titulo }}</div>
        <div class="text-h6 text-white layout">$ {{ produto.preco - produto.promo }}</div>
      </div>
      <q-card-section class="bg-white-1 text-black">
        {{ produto.descricao }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Adicionar ao Carrinho"
          class="bg-light-blue-8 text-white"
          @click="adicionarAoCarrinho"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ProdutoPage',
  props: {
  },
  data() {
    return {
      produto: Object,
    }
  },
  created() {
      fetch('http://localhost:3000/produtos/' + this.$route.params.id)
        .then((res) => {
          res.json().then((dados) => {
            this.produto = dados
          })
        })
        .catch()
    },
  // methods: {
  //   adicionarAoCarrinho() {
  //
  //     })
  //   },
  // },
}
</script>

<style>
.my-card-produto{
  width: 100%;
  max-width: 1920px}
.layout {
  padding: 15px;
}
.flexDisplay {
  display: flex;
  justify-content: space-between;
}
.image-container {
  position: relative;
  width: 100%;
  height: 100vh; /* Ajusta a altura para 100% da altura da tela */
}
</style>
