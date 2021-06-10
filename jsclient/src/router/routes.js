
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      // {path: '/dash', component: () => import('pages/Dashboard.vue')},
      { path: '/auth', component: () => import('pages/Auth.vue') },
      { path: '/list', component: () => import('src/pages/crud/CrudList.vue') },
      { path: '/create', component: () => import('pages/Create.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
