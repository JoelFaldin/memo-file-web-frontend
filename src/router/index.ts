import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import UpdateMemo from '@/views/UpdateMemo.vue'
import CreateMemo from '@/views/CreateMemo.vue'
import UploadExcel from '@/views/UploadExcel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: HomeView,
    },
    {
      path: '/update',
      name: 'Actualizar memorándum',
      component: UpdateMemo,
    },
    {
      path: '/create',
      name: 'Crear memorándum',
      component: CreateMemo,
    },
    {
      path: '/excel',
      name: 'Subir excel',
      component: UploadExcel
    }
  ],
})

export default router
