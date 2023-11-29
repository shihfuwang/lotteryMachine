import { createApp } from 'vue';
import './assets/css/tailwind.css';
import './assets/css/main.css';
import App from './App.vue';
import router from '../src/router/index';
import { createPinia } from 'pinia';
import VueLuckyCanvas from '@lucky-canvas/vue'

const app = createApp(App);
app.use(createPinia()).use(router).use(VueLuckyCanvas);
app.mount('#app');