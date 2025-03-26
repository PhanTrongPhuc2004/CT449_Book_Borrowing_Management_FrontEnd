import axios from 'axios';
import { useAuthStore } from '/src/stores/xacThucStore'; // Import store xác thực

// Cấu hình chung cho headers
const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 10000, // Thêm timeout từ cấu hình mới (tùy chọn)
};

// Hàm tạo axios instance
export default (baseURL) => {
    const api = axios.create({
        baseURL,           // baseURL động từ tham số
        ...commonConfig,   // Gộp commonConfig
    });

    // Thêm request interceptor
    api.interceptors.request.use(
        (config) => {
            const authStore = useAuthStore();
            const token = authStore.token;

            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Thêm response interceptor
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                const authStore = useAuthStore();
                authStore.logout(); // Đăng xuất nếu token hết hạn hoặc không hợp lệ
            }
            return Promise.reject(error);
        }
    );

    return api;
};