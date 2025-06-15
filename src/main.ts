import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import "./assets/css/sb-admin-2.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')




