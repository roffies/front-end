import { createApp } from 'vue'
import App from './app.vue'
import { setupPrimeVue } from './shared-kernel/infrastructure/ui-framework/primevue/index'
import { router } from './shared-kernel/infrastructure/router/index'
import { i18n } from './shared-kernel/infrastructure/i18n/i18n.js'

import '@/assets/styles.scss'

const app = createApp(App)

setupPrimeVue(app, 'aura')
app.use(router)
app.use(i18n)
app.mount('#app')
