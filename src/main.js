
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import router from './routers/index';
import { createApp } from 'vue';
import { useAuthStore } from '/src/stores/xacThucStore';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
const authStore = useAuthStore();
authStore.initializeAuth(); // Khôi phục trạng thái ngay khi ứng dụng khởi động
app.mount('#app');
