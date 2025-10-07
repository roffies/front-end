export const MENU_CONFIG = {
  driver: [
    {
      label: 'menu.driver.home',
      items: [
        {
          label: 'menu.driver.dashboard',
          icon: 'pi pi-fw pi-home',
          to: '/driver/dashboard',
        },
      ],
    },
    {
      label: 'menu.driver.vehicleManagement',
      items: [
        {
          label: 'menu.driver.myVehicles',
          icon: 'pi pi-fw pi-car',
          to: '/driver/vehicles',
        },
      ],
    },
    {
      label: 'menu.driver.services',
      items: [
        {
          label: 'menu.driver.findWorkshop',
          icon: 'pi pi-fw pi-map-marker',
          to: '/driver/workshops',
        },
        {
          label: 'menu.driver.myServices',
          icon: 'pi pi-fw pi-calendar',
          to: '/driver/services',
        },
        {
          label: 'menu.driver.history',
          icon: 'pi pi-fw pi-history',
          to: '/driver/history',
        },
      ],
    },
    {
      label: 'menu.driver.configuration',
      items: [
        {
          label: 'menu.driver.profile',
          icon: 'pi pi-fw pi-user',
          to: '/driver/profile',
        },
        {
          label: 'menu.driver.settings',
          icon: 'pi pi-fw pi-cog',
          to: '/driver/settings',
        },
      ],
    },
  ],

  workshop: [
    {
      label: 'menu.workshop.dashboard',
      items: [
        {
          label: 'menu.workshop.mainPanel',
          icon: 'pi pi-fw pi-chart-bar',
          to: '/workshop/dashboard',
        },
      ],
    },
    {
      label: 'menu.workshop.appointmentManagement',
      items: [
        {
          label: 'menu.workshop.pendingAppointments',
          icon: 'pi pi-fw pi-calendar',
          to: '/workshop/appointments',
        },
        {
          label: 'menu.workshop.calendar',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/workshop/calendar',
        },
      ],
    },
    {
      label: 'menu.workshop.services',
      items: [
        {
          label: 'menu.workshop.serviceCatalog',
          icon: 'pi pi-fw pi-wrench',
          to: '/workshop/services',
        },
        {
          label: 'menu.workshop.quotes',
          icon: 'pi pi-fw pi-file-edit',
          to: '/workshop/quotes',
        },
      ],
    },
    {
      label: 'menu.workshop.reports',
      items: [
        {
          label: 'menu.workshop.reports',
          icon: 'pi pi-fw pi-file-pdf',
          to: '/workshop/reports',
        },
        {
          label: 'menu.workshop.customers',
          icon: 'pi pi-fw pi-users',
          to: '/workshop/customers',
        },
      ],
    },
    {
      label: 'menu.workshop.configuration',
      items: [
        {
          label: 'menu.workshop.workshopProfile',
          icon: 'pi pi-fw pi-building',
          to: '/workshop/profile',
        },
        {
          label: 'menu.workshop.settings',
          icon: 'pi pi-fw pi-cog',
          to: '/workshop/settings',
        },
      ],
    },
  ],
}

export function getMenuByRole(role) {
  return MENU_CONFIG[role] || MENU_CONFIG.driver
}
