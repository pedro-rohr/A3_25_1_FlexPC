<template>
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Editar Produto</div>
        </q-card-section>
  
        <q-card-section>
          <q-form @submit="salvarProduto" class="q-gutter-md">
            <q-input
              filled
              v-model="produto.titulo"
              label="Título"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor digite o título']"
            />
  
            <q-input
              filled
              v-model="produto.urlFoto"
              label="URL da Foto"
              type="url"
              hint="https://exemplo.com/foto.jpg"
            />
  
            
            <q-input
              filled
              v-model="produto.descricao"
              label="Descrição"
              type="textarea"
              rows="4"
            />

            <q-input
              filled
              v-model="produto.maisDetalhes"
              label="Mais detalhes"
              type="textarea"
              rows="4"
            />

            <q-input
              filled
              v-model.number="produto.preco"
              label="Preço"
              type="number"
              step="0.01"
              min="0"
              lazy-rules
              :rules="[ val => val >= 0 || 'Preço deve ser maior que 0']"
              prefix="R$"
            />
  
            <q-input
              filled
              v-model.number="produto.promo"
              label="Desconto Promocional"
              type="number"
              step="0.01"
              min="0"
              prefix="R$"
              hint="Deixe 0 se não houver promoção"
            />
  
            <p>Preço final: R${{  produto.preco - produto.promo  }}</p>
  
            <div class="row q-gutter-sm">
              <q-btn 
                label="Salvar" 
                type="submit" 
                color="primary" 
                :loading="loading"
              />
              <q-btn 
                label="Cancelar" 
                color="negative" 
                flat 
                @click="cancelar"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from 'src/stores/auth'
  export default {
    name: 'ProdutoEdit',
    props: {},
    data() {
      return {
        loading: false,
        produto: {
          titulo: '',
          urlFoto: '',
          preco: 0,
          promo: 0,
          descricao: '',
          maisDetalhes: ''
        },
      }
    },
    created() {
        const authStore = useAuthStore()
        if(authStore){
            if(!authStore.isAdmin){
                this.$router.push(`/produto/${this.$route.params.id}`)
            }
        }
      this.carregarProduto()
      
    },
    methods: {
      carregarProduto() {
        fetch('http://localhost:3000/produtos/' + this.$route.params.id)
          .then((res) => {
            res.json().then((dados) => {
              this.produto = dados
            })
          })
          .catch(error => {
            console.error('Erro ao carregar produto:', error)
            this.$q.notify({
              color: 'negative',
              message: 'Erro ao carregar produto',
              icon: 'report_problem'
            })
          })
      },
  
      salvarProduto() {
        this.loading = true
        
        fetch('http://localhost:3000/produtos/' + this.$route.params.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.produto)
        })
        .then(response => {
          if (response.ok) {
            this.$q.notify({
              color: 'positive',
              textColor: 'white',
              icon: 'done',
              message: 'Produto atualizado com sucesso!'
            })
            this.$router.push('/produto/' + this.$route.params.id)
          } else {
            throw new Error('Erro ao salvar')
          }
        })
        .catch(error => {
          console.error('Erro ao salvar produto:', error)
          this.$q.notify({
            color: 'negative',
            message: 'Erro ao salvar produto',
            icon: 'report_problem'
          })
        })
        .finally(() => {
          this.loading = false
        })
      },
  
      cancelar() {
        this.$router.push(this.$router.back())
      }
    }
  }
  </script>
  
  <style scoped>
  .my-card {
    max-width: 70%;
    min-width: 70%;
    height: 100%;
    margin: 0 auto;
  }
  </style>