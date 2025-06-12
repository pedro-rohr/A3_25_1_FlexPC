<template>
  <div class="container">
    <div class="container-produto">
      <div class="image-container">
        <img class="image-produto" :src="produto.urlFoto" alt="Imagem do produto" />
      </div>
      <div class="texto-produto">
        <h2>{{ produto.titulo }}</h2>
        <h2>Sobre este item:</h2>
        <p>{{ produto.descricao }}</p>
      </div>
      <div class="texto-produto">
        <h2>Mais detalhes</h2>
        <p>{{ produto.maisDetalhes || '-' }}</p>
      </div>
    </div>
    <div class="container-aluguel">
      <form class="container-form" @submit.prevent="alugarProduto">
        <div class="formulario">
          <TextInput v-model="name" placeholder="Digite nome completo" />
          <TextInput v-model="cpf" placeholder="Digite CPF" />
          <TextInput v-model="cep" placeholder="Digite CEP" />
          <TextInput v-model="endereco" placeholder="Digite endereço completo" />
          <TextInput v-model="dtainicio" placeholder="Data de início ex: DD/MM/AAAA" />
          <TextInput v-model="dtafim" placeholder="Data fim ex: DD/MM/AAAA" />
          <q-checkbox v-model="aceitaTermos" label="Aceito os termos e condições" />
          <q-checkbox
            v-model="aceitaDiaria"
            label="Aceito que serei cobrado R$ 50,00 por dia de aluguel"
          />
        </div>
        <div class="container-resumo">
          <h1 class="titulo-resumo">Resumo financeiro</h1>
          <h2 class="sub-titulo-resumo">Tempo total alugado:</h2>
          <p class="texto-resumo">{{ diffDays }} dias</p>
          <h2 class="sub-titulo-resumo">Valor diária:</h2>
          <p class="texto-resumo">{{ produto.preco || 'N/A' }}</p>
          <h2 class="sub-titulo-resumo">Total a pagar:</h2>
          <p class="texto-resumo">
            {{ diffDays }} dias x {{ produto.preco || 'N/A' }} =
            {{ diffDays * (produto.preco || 0) }}
          </p>
          <h2 class="sub-titulo-resumo">Valor total a pagar:</h2>
          <p class="valor-final">R$ {{ diffDays * (produto.preco || 0) }}</p>
          <q-btn
            type="submit"
            label="Alugar Produto"
            class="text-white button"
            @click="cadastrarAluguel"
            :disabled="!isFormValid"
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
import { calcularDiasAluguel, isValidDate } from 'src/utils/dateFunctions.js'
import { validaCep } from 'src/utils/validaCep.js'
import { getCepData } from 'src/server/get/getCep.js'

export default {
  name: 'aluguelPage',
  data() {
    return {
      produto: { alugueis: [], alugado: false }, // Inicializa com valores padrão
      name: '',
      endereco: '',
      cep: '',
      cpf: '',
      dtainicio: '',
      dtafim: '',
      aceitaTermos: false,
      aceitaDiaria: false,
      diffDays: 0,
      isFormValid: false,
      isAluguelActive: false,
      isProdutoAlugado: false,
    }
  },
  components: {
    TextInput,
  },
  async created() {
    const id = this.$route.params.productId
    try {
      const response = await getProduto(id)
      this.produto = {
        ...response,
        alugueis: response.alugueis || [],
        alugado: response.alugado || false,
      }
      console.log('Resposta do servidor:', this.produto)
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
      this.produto = { alugueis: [], alugado: false }
    }
  },

  watch: {
    dtainicio: 'validateForm',
    dtafim() {
      this.validateForm()
      this.calcularDiasAluguel()
    },
    name: 'validateForm',
    endereco: 'validateForm',
    async cep(newValue) {
      if (validaCep(newValue)) {
        await this.buscaCep(newValue)
        this.validateForm()
      } else {
        console.error('CEP inválido:', newValue)
      }
    },
    cpf: 'validateForm',
    aceitaTermos: 'validateForm',
    aceitaDiaria: 'validateForm',
  },
  methods: {
    // Calcula a diferença de dias entre as datas de início e fim
    calcularDiasAluguel() {
      if (isValidDate(this.dtainicio) && isValidDate(this.dtafim)) {
        this.diffDays = calcularDiasAluguel(this.dtainicio, this.dtafim)
      } else {
        this.diffDays = 0
      }
    },

    async buscaCep(cep) {
      try {
        const response = await getCepData(cep)
        this.endereco = `${response.street}, ${response.neighborhood}, ${response.city} - ${response.state}`
        console.log('Dados do CEP:', this.endereco)

        return response
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      }
    },
    // Valida o formulário
    validateForm() {
      this.isFormValid =
        this.name &&
        this.endereco &&
        this.cep &&
        this.cpf &&
        this.dtainicio &&
        this.dtafim &&
        this.aceitaTermos &&
        this.aceitaDiaria
    },
    async cadastrarAluguel() {
      if (!this.isFormValid) {
        return
      }

      // Verificar se há aluguéis ativos
      if (Array.isArray(this.produto.alugueis) && this.produto.alugueis.length > 0) {
        console.error('Você já possui um aluguel ativo para este produto.')
        return
      }
      if (this.produto.alugado) {
        console.error('Este produto já está alugado.')
        return
      }

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
        produto_alugado: [this.produto],
      }

      try {
        await postLeasing(aluguel)
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
  max-width: 70%;
  margin: auto;
  padding: 10px;
  background-color: #dfeafd;
  margin-top: 60px;
  border-radius: 15px;
}
@media screen and (max-width: 768px) {
  .container {
    max-width: 100%;
  }
}
.container-produto {
  display: flex;
  flex-direction: row;
}
@media screen and (max-width: 768px) {
  .container-produto {
    flex-wrap: wrap;
  }
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
}
.image-produto {
  width: 100%;
  height: auto;
  border-radius: 15px;
}
.texto-produto {
  max-width: 300px;
  margin-left: 20px;
  padding: 10px;
}
.texto-produto h1 {
  line-height: 0px;
  font-size: 24px;
}
.texto-produto h2 {
  line-height: 30px;
  font-weight: bold;
  font-size: 20px;
}
.texto-produto p {
  font-size: 16px;
}

.container-aluguel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}
.container-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

@media screen and (max-width: 768px) {
  .container-form {
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
  justify-content: center;
}
@media screen and (max-width: 768px) {
  .container-resumo {
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
  line-height: 3px;
}
.texto-resumo {
  font-size: 16px;
  color: white;
}
.valor-final {
  font-weight: bold;
  font-size: 24px;
  color: #0cff5d;
}
.button {
  margin-top: 10px;
  width: 100%;
  background-color: #47c802;
  font-weight: bold;
}
</style>
