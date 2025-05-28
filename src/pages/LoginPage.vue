<template>
    Página login
    <div class="q-pa-md">
      <div class="cursor-pointer">
        Nome
        <q-popup-edit v-model="nickname" :validate="val => val.length > 5" v-slot="scope">
          <q-input
            autofocus
            dense
            v-model="scope.value"
            :model-value="scope.value"
            hint="Nome"
            :rules="[
              val => scope.validate(val) || 'More than 5 chars required'
            ]"
          >
            <template v-slot:after>
              <q-btn
                flat dense color="negative" icon="cancel"
                @click.stop.prevent="scope.cancel"
              />
  
              <q-btn
                flat dense color="positive" icon="check_circle"
                @click.stop.prevent="scope.set"
                :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value"
              />
            </template>
          </q-input>
        </q-popup-edit>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="cursor-pointer">
        Senha
        <q-popup-edit v-model="nickname" :validate="val => val.length > 5" v-slot="scope">
          <q-input
            autofocus
            dense
            v-model="scope.value"
            :model-value="scope.value"
            hint="Senha"
            :rules="[
              val => scope.validate(val) || 'More than 5 chars required'
            ]"
          >
            <template v-slot:after>
              <q-btn
                flat dense color="negative" icon="cancel"
                @click.stop.prevent="scope.cancel"
              />
  
              <q-btn
                flat dense color="positive" icon="check_circle"
                @click.stop.prevent="scope.set"
                :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value"
              />
            </template>
          </q-input>
        </q-popup-edit>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    name: 'LoginPage',
    setup () {
      return {
        nickname: ref('')
      }
    }
  }
  </script>

<style>
</style>