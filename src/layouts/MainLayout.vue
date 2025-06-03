<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          v-if="authStore.isAuthenticated"
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />
       
        <q-toolbar-title>
          <img src="../assets/FlexPC.png" alt="Logo" style="width: 120px;" >
        </q-toolbar-title>
        <div v-if="authStore.isAuthenticated" class="user-info">
          <span class="user-name">{{ authStore.user?.name || authStore.user?.email }}</span>
          <q-btn
            v-if="authStore.isAdmin"
            dense
            flat
            size="sm"
            label="ADMIN"
            class="admin-badge q-ml-sm"
          />
          <q-btn
            dense
            flat
            icon="logout"
            @click="handleLogout"
            class="q-ml-sm"
          >
            <q-tooltip>Sair</q-tooltip>
          </q-btn>
        </div>
        <q-btn
          v-if="authStore.isAuthenticated"
          dense
          flat
          round
          icon="menu"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-if="authStore.isAuthenticated"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <q-list>
        <q-item-label header>Links</q-item-label>
        <!-- Usando o array linksList -->
        <q-item 
          clickable 
          v-ripple 
          v-for="link in linksList" 
          :key="link.title"
          @click="$router.push(link.link)"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Produtos separado se necessário -->
        <q-item clickable v-ripple @click="$router.push('/produto')">
          <q-item-section avatar>
            <q-icon name="shopping_bag" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Produtos</q-item-label>
            <q-item-label caption>Ver todos os produtos</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-drawer
      v-if="authStore.isAuthenticated"
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      bordered
    >
    <!-- carrinho? -->
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useAuthStore } from 'src/stores/auth'

const linksList = [
  {
    title: 'Home',
    caption: 'Página principal',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Sobre',
    caption: 'Sobre nossa empresa',
    icon: 'info',
    link: '/#/sobre',
  },
  {
    title: 'Promoções',
    caption: 'Veja os itens em promoção',
    icon: 'paid',
    link: '/#/promocoes',
  },
]

export default {
  name: 'MainLayout',
 
  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      authStore: null,
      linksList
    }
  },
 
  created() {
    this.authStore = useAuthStore()
  },
 
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
   
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen
    },
   
    handleLogout() {
      this.authStore.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
}
.user-name {
  font-size: 0.9rem;
  margin-right: 0.5rem;
}
.admin-badge {
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: bold;
}
</style>