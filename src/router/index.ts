import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import SearchMemo from '@/views/SearchMemo.vue'
import CreateMemo from '@/views/CreateMemo.vue'
import UploadExcel from '@/views/UploadExcel.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconTable from '@/components/icons/IconTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: HomeView,
      meta: {
        icon: IconHome
      }
    },
    {
      path: '/search',
      name: 'Buscar memorándums',
      component: SearchMemo,
      meta: {
        icon: IconSearch
      }
    },
    {
      path: '/create',
      name: 'Crear memorándum',
      component: CreateMemo,
      meta: {
        icon: IconAdd
      }
    },
    {
      path: '/excel',
      name: 'Subir excel',
      component: UploadExcel,
      meta: {
        icon: IconTable
      }
    }
  ],
})

export default router
