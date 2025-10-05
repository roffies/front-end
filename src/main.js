import { createApp } from 'vue'
import App from './app.vue'
import { setupPrimeVue } from './shared-kernel/infrastructure/ui-framework/primevue/index.js'
import { router } from './shared-kernel/infrastructure/router/router.js'
import { i18n } from './shared-kernel/infrastructure/i18n/i18n.js'

const app = createApp(App)

setupPrimeVue(app, 'aura')

app.use(router)

app.use(i18n)

app.mount('#app')
