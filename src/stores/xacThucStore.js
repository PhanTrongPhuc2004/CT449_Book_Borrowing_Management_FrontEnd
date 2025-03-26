import { defineStore } from 'pinia';
import axios from '../utils/axiosApiService';

// Tạo axios instance cho API xác thực
const axiosInstance = axios("/api/xacthuc");

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,        // Lưu token
        role: null,         // Lưu role (docgia hoặc nhanvien)
        userData: null,     // Lưu thông tin user
        isAuthenticated: false // Trạng thái đăng nhập
    }),

    actions: {
        // Action xử lý đăng nhập
        async login(Email, Password) {
            try {
                const response = await axiosInstance.post('/dangnhap', { Email, Password });
                if (response.data.status === 'success') {
                    this.token = response.data.token;
                    this.role = response.data.data.role;
                    this.userData = response.data.data;
                    this.isAuthenticated = true;

                    // Lưu toàn bộ thông tin cần thiết vào localStorage
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('role', this.role);
                    localStorage.setItem('userData', JSON.stringify(this.userData)); // Chuyển object thành chuỗi JSON
                }
            } catch (error) {
                alert('Đăng nhập thất bại: ' + error.response.data.message);
                throw error;
            }
        },

        // Action đăng xuất
        logout() {
            this.token = null;
            this.role = null;
            this.userData = null;
            this.isAuthenticated = false;

            // Xóa toàn bộ thông tin khỏi localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('userData');
        },

        // Action khôi phục state từ localStorage khi refresh
        initializeAuth() {
            const savedToken = localStorage.getItem('token');
            const savedRole = localStorage.getItem('role');
            const savedUserData = localStorage.getItem('userData');

            if (savedToken && savedRole && savedUserData) {
                this.token = savedToken;
                this.role = savedRole;
                this.userData = JSON.parse(savedUserData); // Chuyển chuỗi JSON về object
                this.isAuthenticated = true;
            }
        }
    },

    getters: {
        getUserInfo: (state) => state.userData,
        isDocGia: (state) => state.role === 'docgia',
        isNhanVien: (state) => state.role === 'nhanvien'
    }
});