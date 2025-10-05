import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/contexts/auth/presentation/pages/login-page.page.vue'
import RegisterPage from '@/contexts/auth/presentation/pages/register-page.page.vue'
import SelectRolePage from '@/contexts/auth/presentation/pages/select-role.page.vue'
import DriverDashboard from '@/contexts/driver/presentation/pages/driver-dashboard.page.vue'
import WorkshopsPage from '@/contexts/driver/presentation/pages/workshops-page.page.vue'
import HistoryPage from '@/contexts/driver/presentation/pages/history-page.page.vue'
import DriverProfile from '@/contexts/driver/presentation/pages/driver-profile.page.vue'
import WorkshopDashboard from '@/contexts/workshop/presentation/pages/workshop-dashboard.page.vue'
import QuotesPage from '@/contexts/workshop/presentation/pages/quotes-page.page.vue'
import WorkshopProfile from '@/contexts/workshop/presentation/pages/workshop-profile.page.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { layout: 'auth' },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: { layout: 'auth' },
  },
  {
    path: '/select-role',
    name: 'select-role',
    component: SelectRolePage,
    meta: { layout: 'auth' },
  },

  {
    path: '/driver/dashboard',
    name: 'driver-dashboard',
    component: DriverDashboard,
    meta: { layout: 'driver', requiresAuth: true, role: 'driver' },
  },
  {
    path: '/driver/workshops',
    name: 'driver-workshops',
    component: WorkshopsPage,
    meta: { layout: 'driver', requiresAuth: true, role: 'driver' },
  },
  {
    path: '/driver/history',
    name: 'driver-history',
    component: HistoryPage,
    meta: { layout: 'driver', requiresAuth: true, role: 'driver' },
  },
  {
    path: '/driver/profile',
    name: 'driver-profile',
    component: DriverProfile,
    meta: { layout: 'driver', requiresAuth: true, role: 'driver' },
  },

  {
    path: '/workshop/dashboard',
    name: 'workshop-dashboard',
    component: WorkshopDashboard,
    meta: { layout: 'workshop', requiresAuth: true, role: 'workshop' },
  },
  {
    path: '/workshop/quotes',
    name: 'workshop-quotes',
    component: QuotesPage,
    meta: { layout: 'workshop', requiresAuth: true, role: 'workshop' },
  },
  {
    path: '/workshop/profile',
    name: 'workshop-profile',
    component: WorkshopProfile,
    meta: { layout: 'workshop', requiresAuth: true, role: 'workshop' },
  },

  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/shared-kernel/presentation/ui/components/not-found.component.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
