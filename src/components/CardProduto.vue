<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card absolute-positioned">
      <q-img class="ajusta-imagem" :src="urlFoto"> </q-img>
      <div v-if="promo > 0" class="absolute-top-left">
        <LottieAnimation :animationData="black" />
      </div>

      <div class="bg-light-blue-8 flexDisplay">
        <div class="text-h6 text-white layout title-card">{{ titulo }}</div>
        <div v-if="promo !== 0" class="container-valor">
          <p class="preco-normal">{{ formatarPreco(preco) }}</p>
          <p class="preco-novo">{{ formatarPreco(preco - promo) }}</p>
        </div>
        <div v-else class="container-valor">
          <p class="preco-novo">{{ formatarPreco(preco) }}</p>
        </div>
      </div>
      <q-card-section class="bg-white-1 text-black maxText">
        {{ descricao }}
      </q-card-section>
      <q-card-actions class="absolute-bottom-right">
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
  width: 300px;
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
  height: 200px;
  object-fit: cover;
}

.maxText {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  max-height: 100px;
  max-width: 100%;
}

.title-card {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 240px;
  font-size: 16px;
  max-height: 50px;
  margin: 0;
  padding: 10px 0 0 10px;
}

.value-card {
  max-width: 100%;
  font-size: 16px;
  max-height: 50px;
}

.container-valor {
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  margin: 0;
  padding: 0;
}
.preco-normal {
  text-decoration: line-through;
  color: #ff0000;
  margin: 0;
  padding: 0 10px 0 0;
}

.preco-novo {
  color: #05ff04;
  font-weight: bold;
  font-size: 16px;
  margin: 0;
  padding: 0 5px 0 0;
  text-align: end;
}
</style>
