<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card absolute-positioned">
      <q-img class="ajusta-imagem" :src="urlFoto"> </q-img>
      <div v-if="promo > 0" class="absolute-top-left">
        <LottieAnimation :animationData="black" />
      </div>

      <div class="bg-light-blue-8 flexDisplay">
        <div class="text-h6 text-white layout title-card">{{ titulo }}</div>
        <div class="text-h6 text-white layout value-card">{{ formatarPreco(preco - promo) }}</div>
      </div>
      <q-card-section class="bg-white-1 text-black maxText">
        {{ descricao }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Ver Produto" class="bg-light-blue-8 text-white" @click="verProduto" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import black from '../assets/blackF.json'
import LottieAnimation from 'components/LottieAnimation.vue'

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
  components: {
    LottieAnimation,
  },
  data() {
    return {
      black,
    }
  },
  methods: {
    verProduto() {
      this.$router.push('/produto/' + this.id)
    },
    formatarPreco(valor) {
      return 'R$ ' + valor.toFixed(2).replace('.', ',')
    },
  },
}
</script>

<style>
.my-card {
  width: 370px;
  height: 400px;
  max-width: 400px;
  margin: 10px;
  border-radius: 10px;
  @media screen {
  }
}
.layout {
  padding: 15px;
}
.flexDisplay {
  display: flex;
  justify-content: space-between;
}

.ajusta-imagem {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
}

.maxText {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.title-card {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 250px;
  font-size: 16px;
  max-height: 50px;
}

.value-card {
  max-width: 100%;
  font-size: 16px;
  max-height: 50px;
}
</style>
