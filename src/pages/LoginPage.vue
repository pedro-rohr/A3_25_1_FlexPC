<template>
  <q-page class="flex flex-center">
    <q-card class="login-card q-pa-lg">
      <q-card-section class="text-center">
        <q-avatar size="200px" style=" width: 100%; ">
          <img src="../assets/flexPCALT.png" >
        </q-avatar>
      </q-card-section>
      
      <q-card-section>
        <q-form @submit.prevent="handleLogin">
          <q-input
            v-model="form.email"
            type="email"
            label="Email"
            placeholder="Digite seu email"
            outlined
            dense
            required
            class="q-mb-md"
            :rules="[val => !!val || 'Email é obrigatório']"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          
          <q-input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            label="Senha"
            placeholder="Digite sua senha"
            outlined
            dense
            required
            class="q-mb-md"
            :rules="[val => !!val || 'Senha é obrigatória']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
          
          <q-checkbox
            v-model="form.isAdmin"
            label="Administrador"
            color="primary"
            class="q-mb-lg"
          />
          
          <q-btn
            type="submit"
            :loading="loading"
            :disable="loading"
            label="Entrar"
            color="primary"
            size="lg"
            class="full-width q-mb-md"
            no-caps
          >
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Entrando...
            </template>
          </q-btn>
          
          <q-banner
            v-if="error"
            class="text-white bg-negative q-mt-md"
            rounded
            dense
          >
            <template v-slot:avatar>
              <q-icon name="error" />
            </template>
            {{ error }}
          </q-banner>

          <q-banner
            v-if="success"
            class="text-white bg-positive q-mt-md"
            rounded
            dense
          >
            <template v-slot:avatar>
              <q-icon name="check_circle" />
            </template>
            {{ success }}
          </q-banner>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useAuthStore } from 'src/stores/auth'

export default {
  name: 'LoginPage',
  
  data() {
    return {
      form: {
        email: '',
        password: '',
        isAdmin: false
      },
      loading: false,
      error: '',
      success: '',
      showPassword: false
    }
  },
  
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = ''
      this.success = ''
      
      try {
        const authStore = useAuthStore()
        const success = authStore.login(this.form)
       
        if (success) {
          this.success = 'Login realizado com sucesso!'
            this.$router.back()

        } else {
          this.error = 'Credenciais inválidas'
        }
      } catch (err) {
        this.error = `Erro ao fazer login: ${err}`
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>