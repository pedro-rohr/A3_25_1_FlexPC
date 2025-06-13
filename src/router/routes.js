const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/IndexPage.vue'),
      meta: { requiresAuth: false }
    }],
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/LoginPage.vue'),
      meta: { requiresGuest: true }
    }],
  },
 
  // Pagina produto (pode tirar depois)
  {
    path: '/produto',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/ProdutoPage.vue'),
      meta: { requiresAuth: false }
    }],
  },
  {
    path: '/produto/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/ProdutoPage.vue'),
      meta: { requiresAuth: false }
    }],
  },
  {
    path: '/produto/:id/edit',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ 
      path: '', 
      component: () => import('pages/ProdutoEdit.vue'),
      meta: { requiresAuth: true } 
    }],
  },
  {
    path: '/sobre',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AboutPage.vue'),
      meta: { requiresAuth: false }
     }],
  },

  {
    path: '/promocoes',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PromoPage.vue') }],
  },
  {
    path: '/alugar/:productId',
    name: 'alugar',
    meta: { requiresAuth: false },
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LeasingPage.vue') }],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
