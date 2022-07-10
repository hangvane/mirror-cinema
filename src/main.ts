import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import i18n from '/@/languages/i18n';
import 'ant-design-vue/es/message/style/css';
import 'ant-design-vue/es/modal/style/css';
import 'ant-design-vue/es/image/style/css';

const app = createApp(App);
app.use(createPinia());
app.use(i18n);
app.mount('#app');
