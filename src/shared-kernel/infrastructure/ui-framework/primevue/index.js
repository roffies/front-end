import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Lara from '@primeuix/themes/lara'

import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import Menu from 'primevue/menu'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import Divider from 'primevue/divider'
import Panel from 'primevue/panel'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

export const themes = {
  aura: Aura,
  lara: Lara,
}

export function setupPrimeVue(app, selectedTheme = 'aura') {
  const preset = themes[selectedTheme] || themes.aura

  app.use(PrimeVue, {
    theme: { preset },
  })

  app.component('pv-button', Button)
  app.component('pv-data-table', DataTable)
  app.component('pv-column', Column)
  app.component('pv-input-text', InputText)
  app.component('pv-password', Password)
  app.component('pv-checkbox', Checkbox)
  app.component('pv-card', Card)
  app.component('pv-dialog', Dialog)
  app.component('pv-menu', Menu)
  app.component('pv-avatar', Avatar)
  app.component('pv-badge', Badge)
  app.component('pv-divider', Divider)
  app.component('pv-panel', Panel)
  app.component('pv-tab-view', TabView)
  app.component('pv-tab-panel', TabPanel)
}
