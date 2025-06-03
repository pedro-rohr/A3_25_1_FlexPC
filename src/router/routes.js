const routes = [
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ 
      path: '', 
      component: () => import('pages/LoginPage.vue'),
      meta: { requiresGuest: true }
    }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ 
      path: '', 
      component: () => import('pages/IndexPage.vue'),
      meta: { requiresAuth: true }
    }],
  },
  // Pagina produto (pode tirar depois)
  {
    path: '/produto',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ 
      path: '', 
      component: () => import('pages/ProdutoPage.vue'),
      meta: { requiresAuth: true }
    }],
  },
  {
    path: '/produto/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ 
      path: '', 
      component: () => import('pages/ProdutoPage.vue'),
      meta: { requiresAuth: true } 
    }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes