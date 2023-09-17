import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Global sytles
import '@/assets/main.css'

createApp(App).use(router).mount('#app')
