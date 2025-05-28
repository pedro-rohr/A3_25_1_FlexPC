<template>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-img :src="urlFoto" style="height: 225px"></q-img>
        <div class="bg-light-blue-8 flexDisplay">
          <div class="text-h6 text-white layout">{{ titulo }}</div>
          <div class="text-h6 text-white layout">$ {{ preco - promo }}</div>
        </div>
        <q-card-section class="bg-white-1 text-black">
          {{ lorem }}
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
    name: 'CardProduto',
    props: {
      titulo: { type: String, required: true },
      urlFoto: { type: String, required: false },
      preco: { type: Number, required: true },
      promo: { type: Number, required: false, default: 0 },
      descricao: { type: String, required: false, default: '' },
    },
    data() {
      return {
        lorem:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      }
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
  .my-card{
    width: 100%;
    max-width: 355px}
  .layout {
    padding: 15px;
  }
  .flexDisplay {
    display: flex;
    justify-content: space-between;
  }
  </style>