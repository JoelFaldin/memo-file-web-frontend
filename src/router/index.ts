import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import UpdateMemo from '../views/UpdateMemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/update',
      name: 'Update memo',
      component: UpdateMemo,
    },
  ],
})

export default router
