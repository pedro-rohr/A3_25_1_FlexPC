<template>
  <div class="container">
    <div class="container-produto">
      <div class="image-container">
        <img class="image-produto" :src="produto.urlFoto" alt="Imagem do produto" />
      </div>
      <div class="texto-produto">
        <h1>{{ produto.titulo }}</h1>
        <h2>Sobre este item:</h2>
        <p>
          {{ produto.descricao }}
        </p>
      </div>
      <div class="texto-produto">
        <h1>Mais detalhes</h1>
        <h2></h2>
        <p>
          {{ produto.detalhes || '-' }}
        </p>
      </div>
    </div>
    <div>
      <form class="container-form" @submit.prevent="alugarProduto">
        <div>
          <TextInput v-model="name" placeholder="Digite nome completo" />
          <TextInput v-model="endereco" placeholder="Digite endereço completo" />
          <TextInput v-model="cep" placeholder="Digite CEP" />
          <TextInput v-model="cpf" placeholder="Digite CPF" />
          <TextInput v-model="dtainicio" placeholder="Digite Data de inicio" />
          <TextInput v-model="dtafim" placeholder="Digite Data fim" />
          <q-checkbox v-model="aceitaTermos" label="Aceito os termos e condições" />
          <q-checkbox
            v-model="aceitaDiaria"
            label="Aceito que serei cobrado R$ 50,00 por dia de aluguel"
          />
        </div>
        <div class="container-resumo">
          <h1 class="titulo-resumo">Resumo financeiro</h1>
          <h2 class="sub-titulo-resumo">Tempo total alugado:</h2>
          <p class="texto-resumo">10 dias</p>
          <h2 class="sub-titulo-resumo">Valor diaria:</h2>
          <p class="texto-resumo">{{ produto.preco }}</p>
          <h2 class="sub-titulo-resumo">Total a pagar:</h2>
          <p class="texto-resumo">10 dias x {{ produto.preco }} = {{ 10 * produto.preco }}</p>
          <h2 class="sub-titulo-resumo">Valor total a pagar:</h2>
          <p class="valor-final">R$ {{ 10 * produto.preco }}</p>
          <q-btn
            type="submit"
            label="Alugar Produto"
            class="text-white button"
            @click="cadastrarAluguel"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TextInput from 'src/components/TextInput.vue'
import postLeasing from '../server/post/postLeasing.js'
import getProduto from 'src/server/get/getProduto.js'

export default {
  name: 'aluguelPage',
  props: {},
  data() {
    return {
      produto: {},
      // Dados do formulário
      // Usando refs para vincular os campos do formulário
      // Dados do aluguel
      name: '',
      endereco: '',
      cep: '',
      cpf: '',
      dtainicio: '',
      dtafim: '',
      aceitaTermos: false,
      aceitaDiaria: false,
    }
  },
  components: {
    TextInput,
  },
  async created() {
    const id = this.$route.params.productId

    try {
      const response = await getProduto(id)
      this.produto = response
      console.log('Resposta do servidor:', response)
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
    }
  },
  methods: {
    async cadastrarAluguel() {
      const aluguel = {
        id: this.produto.id,
        name: this.name,
        endereco: this.endereco,
        cep: this.cep,
        cpf: this.cpf,
        dtainicio: this.dtainicio,
        dtafim: this.dtafim,
        aceitaTermos: this.aceitaTermos,
        aceitaDiaria: this.aceitaDiaria,
        produto_alugado: this.produto,
      }

      try {
        const response = await postLeasing(aluguel)
        console.log('Aluguel cadastrado com sucesso:', response)

        this.alugarProduto()
      } catch (error) {
        console.error('Erro ao cadastrar aluguel:', error)
      }
    },

    alugarProduto() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 90%;
  margin: auto;
  padding: 10px;
  background-color: #dfeafd;
  margin-top: 60px;
  border-radius: 15px;
  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
}
.container-produto {
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  height: 300px;
}
.image-produto {
  width: 100%;
  height: auto;
}
.texto-produto {
  max-width: 400px;
  margin-left: 20px;
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
.container-form {
  display: flex;
  flex-direction: row;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
}
.container-form div {
  flex: 1;
  padding: 10px;
}
.container-resumo {
  background-color: #0860e0;
  padding: 10px;
  border-radius: 8px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0860e0;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
.titulo-resumo {
  font-weight: bold;
  font-size: 24px;
  color: white;
}
.sub-titulo-resumo {
  font-weight: bold;

  font-size: 20px;
  color: white;
}
.texto-resumo {
  font-size: 16px;
  color: white;
}
.valor-final {
  font-weight: bold;
  font-size: 24px;
  color: #0cff5d;
  font-weight: bold;
}

.button {
  margin-top: 10px;
  width: 100%;
  background-color: #47c802;
  font-weight: bold;
}
</style>
