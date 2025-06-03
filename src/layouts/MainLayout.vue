
<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <img src="../assets/FlexPC.png" alt="Logo" style="width: 120px;">
          <RouterLink to="/" style="color: orange;">Title</RouterLink>

        </q-toolbar-title>
        <RouterLink to="/login" style="color: orange;">Login</RouterLink>
                <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="text-light-blue-10">
      <q-list>
        <q-item-label header> Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- Carrinho? -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

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
  // {
  //   title: 'Twitter',
  //   caption: '@quasarframework',
  //   icon: 'rss_feed',
  //   link: 'https://twitter.quasar.dev',
  // },
  // {
  //   title: 'Facebook',
  //   caption: '@QuasarFramework',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev',
  // },
  // {
  //   title: 'Quasar Awesome',
  //   caption: 'Community Quasar projects',
  //   icon: 'favorite',
  //   link: 'https://awesome.quasar.dev',
  // },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  data() {
    return {
      linksList,
      leftDrawerOpen: false,
      rightDrawerOpen: false,
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen
    },
  },
})
</script>
