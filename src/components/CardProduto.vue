<template>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-img :src="urlFoto" style="height: 225px; position: relative;">
          <div
          v-if="promo > 0"
          class="absolute-top-left text-white q-pa-xs bg-light-blue-8" style="border-radius: 4px; font-size: 12px;">
            PROMOÇÃO
          </div>
        </q-img>

        <div class="bg-light-blue-8 flexDisplay">
          <div class="text-h6 text-white layout">{{ titulo }}</div>
          <div class="text-h6 text-white layout">$ {{ preco - promo }}</div>
        </div>
        <q-card-section class="bg-white-1 text-black">
          {{ descricao }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Ver Produto"
            class="bg-light-blue-8 text-white"
            @click="verProduto"
          />
        </q-card-actions>
      </q-card>
    </div>
  </template>

  <script>
  export default {
    name: 'CardProduto',
    props: {
      id: { type: Number, required: true },
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
    methods: {
      verProduto() {
        this.$router.push('/produto/' + this.id);
        // this.$router.push({ name: '/produto/', params: { id: this.id } })
        },
      },
      created() {
      fetch('http://localhost:3000/produtos/' + this.id)
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
