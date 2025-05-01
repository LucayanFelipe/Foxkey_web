import './assets/css/demo.css'
import './assets/vendor/css/core.css'
import './assets/vendor/css/pages/page-account-settings.css'
import './assets/vendor/css/pages/page-auth.css'
import './assets/vendor/css/pages/page-icons.css'
import './assets/vendor/css/pages/page-misc.css'
import './assets/vendor/css/theme-default.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
