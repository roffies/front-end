import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth Routes
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/contexts/auth/presentation/pages/login-page.page.vue'),
      meta: { layout: 'auth' },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/contexts/auth/presentation/pages/register-page.page.vue'),
      meta: { layout: 'auth' },
    },
    {
      path: '/select-role',
      name: 'select-role',
      component: () => import('@/contexts/auth/presentation/pages/select-role.page.vue'),
      meta: { layout: 'auth' },
    },

    // Driver Routes
    {
      path: '/driver',
      redirect: '/driver/dashboard',
    },
    {
      path: '/driver/dashboard',
      name: 'driver-dashboard',
      component: () => import('@/contexts/driver/presentation/pages/driver-dashboard.page.vue'),
      meta: { layout: 'default', role: 'driver' },
    },
    {
      path: '/driver/vehicles',
      name: 'driver-vehicles',
      component: () => import('@/contexts/driver/presentation/pages/driver-profile.page.vue'),
      meta: { layout: 'default', role: 'driver' },
    },
    {
      path: '/driver/vehicles/add',
      name: 'driver-vehicles-add',
      component: () => import('@/contexts/driver/presentation/pages/driver-profile.page.vue'),
      meta: { layout: 'default', role: 'driver' },
    },
    {
      path: '/driver/workshops',
      name: 'driver-workshops',
      component: () => import('@/contexts/driver/presentation/pages/workshops-page.page.vue'),
      meta: { layout: 'default', role: 'driver' },
    },
    {
      path: '/driver/services',
      name: 'driver-services',
      component: () => import('@/contexts/driver/presentation/pages/driver-dashboard.page.vue'),
      meta: { layout: 'default', role: 'driver' },
    },
    {
      path: '/driver/history',
      name: 'driver-history',
      component: () => import('@/contexts/driver/presentation/pages/history-page.page.vue'),
      meta: { layout: 'default', role: 'driver' },
    },
    {
      path: '/driver/profile',
      name: 'driver-profile',
      component: () => import('@/contexts/driver/presentation/pages/driver-profile.page.vue'),
      meta: { layout: 'default', role: 'driver' },
    },
    {
      path: '/driver/settings',
      name: 'driver-settings',
      component: () => import('@/contexts/driver/presentation/pages/driver-profile.page.vue'),
      meta: { layout: 'default', role: 'driver' },
    },

    // Workshop Routes
    {
      path: '/workshop',
      redirect: '/workshop/dashboard',
    },
    {
      path: '/workshop/dashboard',
      name: 'workshop-dashboard',
      component: () => import('@/contexts/workshop/presentation/pages/workshop-dashboard.page.vue'),
      meta: { layout: 'default', role: 'workshop' },
    },
    {
      path: '/workshop/appointments',
      name: 'workshop-appointments',
      component: () => import('@/contexts/workshop/presentation/pages/workshop-dashboard.page.vue'),
      meta: { layout: 'default', role: 'workshop' },
    },
    {
      path: '/workshop/calendar',
      name: 'workshop-calendar',
      component: () => import('@/contexts/workshop/presentation/pages/workshop-dashboard.page.vue'),
      meta: { layout: 'default', role: 'workshop' },
    },
    {
      path: '/workshop/services',
      name: 'workshop-services',
      component: () => import('@/contexts/workshop/presentation/pages/workshop-dashboard.page.vue'),
      meta: { layout: 'default', role: 'workshop' },
    },
    {
      path: '/workshop/quotes',
      name: 'workshop-quotes',
      component: () => import('@/contexts/workshop/presentation/pages/quotes-page.page.vue'),
      meta: { layout: 'default', role: 'workshop' },
    },
    {
      path: '/workshop/reports',
      name: 'workshop-reports',
      component: () => import('@/contexts/workshop/presentation/pages/workshop-dashboard.page.vue'),
      meta: { layout: 'default', role: 'workshop' },
    },
    {
      path: '/workshop/customers',
      name: 'workshop-customers',
      component: () => import('@/contexts/workshop/presentation/pages/workshop-dashboard.page.vue'),
      meta: { layout: 'default', role: 'workshop' },
    },
    {
      path: '/workshop/profile',
      name: 'workshop-profile',
      component: () => import('@/contexts/workshop/presentation/pages/workshop-profile.page.vue'),
      meta: { layout: 'default', role: 'workshop' },
    },
    {
      path: '/workshop/settings',
      name: 'workshop-settings',
      component: () => import('@/contexts/workshop/presentation/pages/workshop-profile.page.vue'),
      meta: { layout: 'default', role: 'workshop' },
    },

    // 404 Route
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/contexts/auth/presentation/pages/login-page.page.vue'),
      meta: { layout: 'auth' },
    },
  ],
})

export default router

