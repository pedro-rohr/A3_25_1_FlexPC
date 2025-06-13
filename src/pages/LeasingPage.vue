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
      <q-form class="container-form" @submit.prevent="alugarProduto">
        <div class="formulario">
          <q-input
            v-model="name"
            outlined
            label="Nome completo"
            placeholder="Digite nome completo"
            :rules="[val => !!val || 'Nome é obrigatório']"
            lazy-rules
            class="input-branco"
            dense
          />
          <q-input
            v-model="cpf"
            outlined
            label="CPF"
            placeholder="Digite CPF"
            mask="###.###.###-##"
            :rules="[val => !!val || 'CPF é obrigatório']"
            lazy-rules
            class="input-branco"
            dense
          />
          <q-input
            v-model="cep"
            outlined
            label="CEP"
            placeholder="Digite CEP"
            mask="#####-###"
            :rules="[val => !!val || 'CEP é obrigatório']"
            lazy-rules
            class="input-branco"
            dense
          />
          <q-input
            v-model="endereco"
            label="Endereço completo"
            outlined
            placeholder="Digite endereço completo"
            :rules="[val => !!val || 'Endereço é obrigatório']"
            lazy-rules
            readonly
            class="input-branco"
            dense
          />
          <q-input
            v-model="dtainicio"
            outlined
            label="Data de início"
            placeholder="DD/MM/AAAA"
            mask="##/##/####"
            :rules="[
              val => !!val || 'Data de início é obrigatória',
              val => isValidDate(val) || 'Data inválida'
            ]"
            lazy-rules
            class="input-branco"
            dense
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dtainicio" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            v-model="dtafim"
            outlined
            label="Data fim"
            placeholder="DD/MM/AAAA"
            mask="##/##/####"
            :rules="[
              val => !!val || 'Data fim é obrigatória',
              val => isValidDate(val) || 'Data inválida',
              val => isEndDateValid(val) || 'Data fim deve ser posterior à data início'
            ]"
            lazy-rules
            class="input-branco"
            dense
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dtafim" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="checkbox-container">
            <q-checkbox 
              v-model="aceitaTermos" 
              label="Aceito os termos e condições"
              color="primary"
              dense
            />
            <q-checkbox
              v-model="aceitaDiaria"
              label="Aceito que serei cobrado pela diária do produto + R$ 50,00 de taxa por dia"
              color="primary"
              dense
            />
          </div>
        </div>
        
        <div class="container-resumo">
          <h1 class="titulo-resumo">Resumo financeiro</h1>
          <div class="resumo-content">
            <div class="resumo-item">
              <span class="sub-titulo-resumo">Tempo total alugado:</span>
              <span class="texto-resumo">{{ diffDays }} {{ diffDays === 1 ? 'dia' : 'dias' }}</span>
            </div>
            <div class="resumo-item">
              <span class="sub-titulo-resumo">Valor diária do produto:</span>
              <span class="texto-resumo">R$ {{ formatPrice(produto.preco) }}</span>
            </div>
            <div class="resumo-item">
              <span class="sub-titulo-resumo">Taxa adicional por dia:</span>
              <span class="texto-resumo">R$ {{ formatPrice(taxaAdicional) }}</span>
            </div>
            <div class="resumo-item">
              <span class="sub-titulo-resumo">Valor diário total:</span>
              <span class="texto-resumo">R$ {{ formatPrice(valorDiario) }}</span>
            </div>
            <div class="resumo-item">
              <span class="sub-titulo-resumo">Subtotal produto:</span>
              <span class="texto-resumo">
                {{ diffDays }} {{ diffDays === 1 ? 'dia' : 'dias' }} x R$ {{ formatPrice(produto.preco) }} = R$ {{ formatPrice(valorProduto) }}
              </span>
            </div>
            <div class="resumo-item">
              <span class="sub-titulo-resumo">Subtotal taxas:</span>
              <span class="texto-resumo">
                {{ diffDays }} {{ diffDays === 1 ? 'dia' : 'dias' }} x R$ {{ formatPrice(taxaAdicional) }} = R$ {{ formatPrice(valorTaxas) }}
              </span>
            </div>
            <div class="resumo-item final">
              <span class="sub-titulo-resumo">Valor total a pagar:</span>
              <span class="valor-final">R$ {{ formatPrice(valorTotal) }}</span>
            </div>
          </div>
          <q-btn
            type="submit"
            label="Alugar Produto"
            color="positive"
            class="text-white button"
            @click="cadastrarAluguel"
            :disabled="!isFormValid || !authStore.isAuthenticated"
            :loading="loading"
            size="lg"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from 'src/stores/auth.js'
import postLeasing from '../server/post/postLeasing.js'
import getProduto from 'src/server/get/getProduto.js'
import { calcularDiasAluguel, isValidDate } from 'src/utils/dateFunctions.js'
import { validaCep } from 'src/utils/validaCep.js'
import { getCepData } from 'src/server/get/getCep.js'

export default {
  name: 'aluguelPage',
  data() {
    return {
      produto: { alugueis: [], alugado: false, preco: 0 },
      name: '',
      endereco: '',
      cep: '',
      cpf: '',
      dtainicio: '',
      dtafim: '',
      aceitaTermos: false,
      aceitaDiaria: false,
      isFormValid: false,
      isAluguelActive: false,
      isProdutoAlugado: false,
      loading: false
    }
  },
  computed: {
    diffDays() {
      if (isValidDate(this.dtainicio) && isValidDate(this.dtafim)) {
        const days = calcularDiasAluguel(this.dtainicio, this.dtafim)
        return days > 0 ? days : 0
      }
      return 0
    },
    taxaAdicional() {
      return 50 // Taxa fixa de R$ 50,00 por dia
    },
    valorDiario() {
      return (this.produto.preco || 0) + this.taxaAdicional
    },
    valorProduto() {
      return this.diffDays * (this.produto.preco || 0)
    },
    valorTaxas() {
      return this.diffDays * this.taxaAdicional
    },
    valorTotal() {
      return this.valorProduto + this.valorTaxas
    }
  },
  async created() {
    this.authStore = useAuthStore()
    const id = this.$route.params.productId
    try {
      const response = await getProduto(id)
      this.produto = {
        ...response,
        alugueis: response.alugueis || [],
        alugado: response.alugado || false,
        preco: response.preco || 0
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
      this.produto = { alugueis: [], alugado: false, preco: 0 }
    }
  },

  watch: {
    dtainicio: 'validateForm',
    dtafim: 'validateForm',
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
    validateForm() {
      this.isFormValid =
        this.name.trim() !== '' &&
        this.endereco.trim() !== '' &&
        this.cep.trim() !== '' &&
        this.cpf.trim() !== '' &&
        this.dtainicio.trim() !== '' &&
        this.dtafim.trim() !== '' &&
        isValidDate(this.dtainicio) &&
        isValidDate(this.dtafim) &&
        this.isEndDateValid(this.dtafim) &&
        this.aceitaTermos &&
        this.aceitaDiaria;

      console.log('✅ FORM VALID?', this.isFormValid);
      console.log('🔍 VALORES DOS CAMPOS:', {
        name: `"${this.name}"`,
        endereco: `"${this.endereco}"`,
        cep: `"${this.cep}"`,
        cpf: `"${this.cpf}"`,
        dtainicio: `"${this.dtainicio}"`,
        dtafim: `"${this.dtafim}"`,
        aceitaTermos: this.aceitaTermos,
        aceitaDiaria: this.aceitaDiaria,
        datesValid: isValidDate(this.dtainicio) && isValidDate(this.dtafim),
        endDateValid: this.isEndDateValid(this.dtafim)
      });
    },
    isEndDateValid(endDateStr) {
      if (!isValidDate(this.dtainicio) || !isValidDate(endDateStr)) {
        return false;
      }
      return calcularDiasAluguel(this.dtainicio, endDateStr) > 0;
    },
    formatPrice(price) {
      if (!price && price !== 0) return '0,00';
      return price.toFixed(2).replace('.', ',');
    },
    async cadastrarAluguel() {
      if (!this.isFormValid) {
        console.error('Formulário inválido');
        return
      }

      if (Array.isArray(this.produto.alugueis) && this.produto.alugueis.length > 0) {
        console.error('Você já possui um aluguel ativo para este produto.');
        return
      }
      
      if (this.produto.alugado) {
        console.error('Este produto já está alugado.');
        return
      }

      this.loading = true;

      const aluguel = {
        id: this.produto.id,
        name: this.name.trim(),
        endereco: this.endereco.trim(),
        cep: this.cep.trim(),
        cpf: this.cpf.trim(),
        dtainicio: this.dtainicio.trim(),
        dtafim: this.dtafim.trim(),
        aceitaTermos: this.aceitaTermos,
        aceitaDiaria: this.aceitaDiaria,
        produto_alugado: [this.produto],
        valorTotal: this.valorTotal,
        diasAluguel: this.diffDays,
        valorProduto: this.valorProduto,
        valorTaxas: this.valorTaxas,
        taxaAdicional: this.taxaAdicional
      }

      try {
        await postLeasing(aluguel)
        this.alugarProduto()
        this.$q.notify({
              color: 'positive',
              textColor: 'done',

              message: 'Produto alugado com sucesso!'
            })
      } catch (error) {
        console.error('Erro ao cadastrar aluguel:', error)
      } finally {
        this.loading = false;
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
  padding: 15px;
  background-color: #dfeafd;
  margin-top: 40px;
  border-radius: 15px;
}
.container-produto {
  display: flex;
  flex-direction: row;
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
  margin-top: 15px;
  width: 100%;
}

.container-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  gap: 25px;
}

.formulario {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 500px;
}

.input-branco :deep(.q-field__control) {
  background-color: white !important;
}

.input-branco :deep(.q-field__native) {
  background-color: white !important;
}
.input-branco :deep(.q-field__control::before){
  border: none;
}

.checkbox-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 5px;
}

.container-resumo {
  background-color: #0860e0;
  padding: 25px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0.45;
  min-width: 380px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.titulo-resumo {
  font-weight: bold;
  font-size: 24px;
  color: white;
  margin-bottom: 15px;
  text-align: center;
}

.resumo-content {
  width: 100%;
  margin-bottom: 20px;
}

.resumo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 4px 0;
}

.resumo-item.final {
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  padding-top: 15px;
  margin-top: 15px;
}

.sub-titulo-resumo {
  font-weight: bold;
  font-size: 16px;
  color: white;
}

.texto-resumo {
  font-size: 15px;
  color: white;
  text-align: right;
}

.valor-final {
  font-weight: bold;
  font-size: 22px;
  color: #0cff5d;
}

.button {
  width: 100%;
  background-color: #47c802;
  font-weight: bold;
  min-height: 50px;
  font-size: 16px;
}
</style>