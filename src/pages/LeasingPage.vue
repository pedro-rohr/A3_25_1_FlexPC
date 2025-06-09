<template>
  <div class="container">
    <div class="container-produto">
      <div class="image-container">
        <img
          class="image-produto"
          src="https://thumbs.dreamstime.com/b/computador-de-secret%C3%A1ria-com-foto-que-edita-o-software-27075400.jpg"
          alt="Imagem do produto"
        />
      </div>
      <div class="texto-produto">
        <h1>Apple 2024 iMac</h1>
        <h2>Sobre este item Marca:</h2>
        <p>
          Apple Sistema operacional: Mac OS Modelo da CPU: Apple M4 Descrição da placa de vídeo:
          Integrado Tamanho da tela: 24 Polegadas Tamanho instalado da memória RAM: 16 GB
        </p>
      </div>
      <div class="texto-produto">
        <h1>Mais detalhes</h1>
        <h2>PERFEITO PARA QUALQUER ESPAÇO</h2>
        <p>
          — O design integrado, ultrafino e em sete cores vibrantes, fica sempre bem onde quer que o
          coloque.
        </p>
      </div>
    </div>
    <div>
      <form @submit.prevent="alugarProduto">
        <TextInput v-model="name" label="Nome completo" placeholder="Digite seu nome" />
        <button type="submit">Alugar produto</button>
      </form>
    </div>
  </div>
</template>

<script>
import TextInput from 'src/components/TextInput.vue'

export default {
  name: 'ProdutoPage',
  props: {},
  data() {
    return {
      produto: Object,
    }
  },
  components: {
    TextInput,
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
      alert('Alugando produto com ID:', this.produto.id)

      // this.$router.push('/alugar/' + this.produto.id)
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 70%;
  margin: auto;
  padding: 10px;
  background-color: red;
  margin-top: 60px;
}
.container-produto {
  display: flex;
  flex-direction: row;
  background-color: violet;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  height: 300px;
  background-color: blue;
}
.image-produto {
  width: 100%;
  height: auto;
}
.texto-produto {
  max-width: 400px;
  background-color: lightcyan;
  padding: 10px;
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 20px;
  }
  p {
    font-size: 16px;
  }
}
</style>
