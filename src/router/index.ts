import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import UpdateMemo from '../views/UpdateMemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/update',
      name: 'update',
      component: UpdateMemo,
    },
  ],
})

export default router
