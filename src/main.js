import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { auth } from "@/firebase/config";
import { createPinia } from "pinia";

// Global sytles
import "./assets/styles.css";

//import '@/assets/main.css'

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(createPinia()).use(router).mount("#app");
  }
});
