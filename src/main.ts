import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';

import router from './router';
import App from './App.vue';
import './assets/index.css';

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);

app.mount('#app');
