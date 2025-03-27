<template>
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 50vh;">
        <div class="card p-4" style="width: 24rem;">
            <h3 class="card-title text-center">Đăng nhập</h3>
            <form @submit.prevent="handleLogin">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Mật khẩu</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100 mt-4">Đăng nhập</button>
            </form>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '/src/stores/xacthucStore.js';

export default {
    name: 'DangNhap',
    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },
    data() {
        return {
            email: '',
            password: '',
            message: ''
        };
    },
    methods: {
        async handleLogin() {

            this.message = '';
            await this.authStore.login(this.email, this.password);  
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 500px;
    margin-top: 10px;
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
</style>