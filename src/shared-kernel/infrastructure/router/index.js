import { createRouter, createWebHistory } from 'vue-router'
import { TokenManager } from '../auth/token-manager.js'

import LoginPage from '@/contexts/auth/presentation/pages/login-page.page.vue'
import RegisterPage from '@/contexts/auth/presentation/pages/register-page.page.vue'

import DriverDashboard from '@/contexts/driver/presentation/pages/driver-dashboard.page.vue'
import WorkshopsPage from '@/contexts/driver/presentation/pages/workshops-page.page.vue'
import HistoryPage from '@/contexts/driver/presentation/pages/history-page.page.vue'
import DriverProfile from '@/contexts/driver/presentation/pages/driver-profile.page.vue'

import WorkshopDashboard from '@/contexts/workshop/presentation/pages/workshop-dashboard.page.vue'
import QuotesPage from '@/contexts/workshop/presentation/pages/quotes-page.page.vue'
import WorkshopProfile from '@/contexts/workshop/presentation/pages/workshop-profile.page.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },

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
    path: '/driver',
    redirect: '/driver/dashboard',
  },
  {
    path: '/driver/dashboard',
    name: 'driver-dashboard',
    component: DriverDashboard,
    meta: { layout: 'driver', requiresAuth: true, role: 'driver' },
  },
  {
    path: '/driver/vehicles',
    name: 'driver-vehicles',
    component: DriverProfile,
    meta: { layout: 'driver', requiresAuth: true, role: 'driver' },
  },
  {
    path: '/driver/vehicles/add',
    name: 'driver-vehicles-add',
    component: DriverProfile,
    meta: { layout: 'driver', requiresAuth: true, role: 'driver' },
  },
  {
    path: '/driver/workshops',
    name: 'driver-workshops',
    component: WorkshopsPage,
    meta: { layout: 'driver', requiresAuth: true, role: 'driver' },
  },
  {
    path: '/driver/services',
    name: 'driver-services',
    component: DriverDashboard,
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
    path: '/driver/settings',
    name: 'driver-settings',
    component: DriverProfile,
    meta: { layout: 'driver', requiresAuth: true, role: 'driver' },
  },

  {
    path: '/workshop',
    redirect: '/workshop/dashboard',
  },
  {
    path: '/workshop/dashboard',
    name: 'workshop-dashboard',
    component: WorkshopDashboard,
    meta: { layout: 'workshop', requiresAuth: true, role: 'workshop' },
  },
  {
    path: '/workshop/appointments',
    name: 'workshop-appointments',
    component: WorkshopDashboard,
    meta: { layout: 'workshop', requiresAuth: true, role: 'workshop' },
  },
  {
    path: '/workshop/calendar',
    name: 'workshop-calendar',
    component: WorkshopDashboard,
    meta: { layout: 'workshop', requiresAuth: true, role: 'workshop' },
  },
  {
    path: '/workshop/services',
    name: 'workshop-services',
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
    path: '/workshop/reports',
    name: 'workshop-reports',
    component: WorkshopDashboard,
    meta: { layout: 'workshop', requiresAuth: true, role: 'workshop' },
  },
  {
    path: '/workshop/customers',
    name: 'workshop-customers',
    component: WorkshopDashboard,
    meta: { layout: 'workshop', requiresAuth: true, role: 'workshop' },
  },
  {
    path: '/workshop/profile',
    name: 'workshop-profile',
    component: WorkshopProfile,
    meta: { layout: 'workshop', requiresAuth: true, role: 'workshop' },
  },
  {
    path: '/workshop/settings',
    name: 'workshop-settings',
    component: WorkshopProfile,
    meta: { layout: 'workshop', requiresAuth: true, role: 'workshop' },
  },

  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('@/shared-kernel/presentation/ui/pages/not-found.page.vue'),
    meta: { layout: 'none' },
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found',
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!TokenManager.isAuthenticated()) {
      console.log('🔒 No token or user found, redirecting to login')
      next('/login')
      return
    }

    const userRole = TokenManager.getUserRole()
    if (to.meta.role && userRole !== to.meta.role) {
      console.log(`🚫 User role '${userRole}' doesn't match required role '${to.meta.role}'`)
      if (userRole === 'driver') {
        next('/driver/dashboard')
      } else if (userRole === 'workshop') {
        next('/workshop/dashboard')
      } else {
        next('/login')
      }
      return
    }
  }

  if ((to.path === '/login' || to.path === '/register') && to.meta.layout === 'auth') {
    if (TokenManager.isAuthenticated()) {
      const userRole = TokenManager.getUserRole()
      console.log('User already logged in, redirecting to dashboard')
      if (userRole === 'driver') {
        next('/driver/dashboard')
      } else if (userRole === 'workshop') {
        next('/workshop/dashboard')
      } else {
        next('/driver/dashboard')
      }
      return
    }
  }

  next()
})
