<template>
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 50vh;">
        <div class="card p-4" style="width: 24rem;">
            <h3 class="card-title text-center">Đăng ký tài khoản độc giả</h3>
            <form @submit.prevent="handleRegister">
                <div class="mb-3">
                    <label for="hoten" class="form-label">Nhập Họ tên:</label>
                    <input type="text" class="form-control" id="hoten" v-model="hoten" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Nhập email:</label>
                    <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Nhập mật khẩu:</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <div class="mb-3">
                    <label for="password2" class="form-label">Nhập lại mật khẩu:</label>
                    <input type="password" class="form-control" id="password2" v-model="password2" required>
                    <div v-if="passwordMismatch" class="text-danger mt-1">Mật khẩu không khớp!</div>
                </div>
                <button type="submit" class="btn btn-primary w-100 mt-3" :disabled="isLoading || passwordMismatch">
                    {{ isLoading ? 'Đang đăng ký...' : 'Đăng ký' }}
                </button>
            </form>
            <div v-if="errorMessage" class="custom-alert text-danger mt-3">{{ errorMessage }}</div>
            <div v-if="successMessage" class="custom-alert text-success mt-3">{{ successMessage }}</div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from '/src/utils/axiosApiService.js'; // Giả định bạn đã cấu hình axios

export default {
    name: 'DangKy',
    setup() {
        const hoten = ref('');
        const email = ref('');
        const password = ref('');
        const password2 = ref('');
        const isLoading = ref(false);
        const errorMessage = ref('');
        const successMessage = ref('');
        const router = useRouter();
        const axiosInstance = axios("/api/xacthuc");

        // Kiểm tra mật khẩu có khớp không
        const passwordMismatch = computed(() => password.value !== password2.value && password2.value !== '');

        const handleRegister = async () => {
            // Reset thông báo
            errorMessage.value = '';
            successMessage.value = '';

            // Kiểm tra mật khẩu khớp trước khi gửi
            if (password.value !== password2.value) {
                errorMessage.value = 'Mật khẩu không khớp!';
                return;
            }

            isLoading.value = true;
            try {
                const response = await axiosInstance.post('/dangky', {
                    Email: email.value,
                    Password: password.value,
                    HoTen: hoten.value
                });

                if (response.data.success) {
                    successMessage.value = 'Đăng ký thành công! Đang chuyển hướng tới đăng nhập...';
                    setTimeout(() => {
                        router.push('/dangnhap');
                    }, 1000);
                } else {
                    errorMessage.value = response.data.message || 'Đăng ký thất bại!';
                }
            } catch (error) {
                errorMessage.value = error.response?.data?.message || 'Có lỗi xảy ra khi đăng ký! '+ error;
            } finally {
                isLoading.value = false;
            }
        };

        return {
            hoten,
            email,
            password,
            password2,
            isLoading,
            errorMessage,
            successMessage,
            passwordMismatch,
            handleRegister
        };
    }
};
</script>

<style scoped>
.container {
    max-width: 500px;
    margin-top: 110px !important;
    height: 600px;
}

.custom-alert {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.btn-primary {
    background-color: #36d1dc;
    border: none;
}

.btn-primary:hover {
    background-color: #2bb8c2;
}

.btn-primary:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.text-danger {
    font-size: 0.9rem;
}

.text-success {
    font-size: 0.9rem;
}
</style>