<template>
  <div class="">
    <q-card class="my-card-produto">
      <div class="image-container">
        <q-img :src="produto.urlFoto" class="image-container"> </q-img>
      </div>
      <div v-if="produto.promo > 0" class="absolute-top-left">
        <LottieAnimation :animationData="black" />
      </div>
      <div class="bg-light-blue-8 flexDisplay">
        <div class="text-h6 text-white layout">{{ produto.titulo }}</div>
        <div class="text-h6 text-white layout">
          {{ formatarPreco(produto.preco - produto.promo) }}
        </div>
      </div>
      <q-card-section class="bg-white-1 text-black">
        {{ produto.descricao }}
      </q-card-section>
      <q-card-actions class="absolute-bottom-right">
        <q-btn
          label="Alugar produto"
          class="bg-light-blue-8 text-white"
          @click="alugarProduto(produto.id)"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import LottieAnimation from '../components/LottieAnimation.vue'
import black from '../assets/blackF.json'

export default {
  name: 'ProdutoPage',
  props: {},
  data() {
    return {
      produto: Object,
      black,
    }
  },
  components: {
    LottieAnimation,
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
  methods: {
    alugarProduto() {
      this.$router.push('/alugar/' + this.produto.id)
    },
    formatarPreco(valor) {
      return 'R$ ' + valor.toFixed(2).replace('.', ',')
    },
  },
  // },
}
</script>

<style>
.image-container {
  margin-top: 30px;
  width: 100%;
  height: 600px;
  object-fit: cover;
}

.my-card-produto {
  width: 100%;
  margin: auto;
  max-width: 600px;
  height: 650px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: auto;
  }
}
.layout {
  padding: 15px;
}
.flexDisplay {
  display: flex;
  justify-content: space-between;
}
.image-container {
  width: 100%;
  height: 400px;
  object-fit: cover;
  margin-bottom: 30px;
}
</style>
