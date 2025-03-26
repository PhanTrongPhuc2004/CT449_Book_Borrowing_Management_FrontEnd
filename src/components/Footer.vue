<template>
    <footer class="footer">
        <!-- Main Footer -->
        <div class="main-footer container-fluid">
            <div class="row">
                <!-- Cột 1: Logo/Thương hiệu -->
                <div class="col-md-4 col-sm-12 footer-brand">
                    <router-link to="/" class="brand-link">
                        <i class="fa-solid fa-book me-2"></i>
                        <span>Hệ thống quản lý mượn sách</span>
                    </router-link>
                    <p class="description">
                        Là phần mềm được thiết kế để tự động hóa và tối ưu hóa các quy trình mượn và trả sách trong thư viện
                    </p>
                </div>

                <!-- Cột 2: Liên kết nhanh -->
                <div class="col-md-4 col-sm-6 footer-links">
                    <h5>Mạng xã hội</h5>
                    <ul>
                        <li>
                            <a href="https://www.facebook.com/trongphuc.phan.908/" class="brand-link text-white me-3"
                                target="_blank">
                                <i class="fa-brands fa-facebook"></i> Facebook</a>
                        </li>
                        <li>
                            <a href="https://github.com/PhanTrongPhuc2004" class="brand-link text-white me-3" target="_blank">
                                <i class="fa-brands fa-github"> </i> Github
                            </a>
                        </li>
                        <li>
                            <a href="https://mail.google.com/" class="brand-link text-white me-3" target="_blank">
                                <i class="fa-solid fa-envelope"></i> Email
                            </a>
                        </li>
                        <li><router-link to="/dangnhap" v-if="!user">Đăng nhập</router-link></li>
                        <li><router-link to="/dangky" v-if="!user">Đăng ký</router-link></li>
                    </ul>
                </div>

                <!-- Cột 3: Liên hệ -->
                <div class="col-md-4 col-sm-6 footer-contact">
                    <h5>Liên hệ</h5>
                    <ul>
                        <li><i class="fa-solid fa-envelope me-2"></i> phucb2203525@student.ctu.edu.vn</li>
                        <li><i class="fa-solid fa-phone me-2"></i> 0783756325</li>
                        <li><i class="fa-solid fa-map-marker-alt me-2"></i>Khu 2, Đ. 3/2, P. Xuân Khánh, Q. Ninh Kiều,
                            TP. CT</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Sub Footer -->
        <div class="sub-footer">
            <p> Copyright &copy; {{ currentYear }} Phan Trọng Phúc</p>
        </div>
    </footer>
</template>

<script>
import { computed } from 'vue';
import { useAuthStore } from '/src/stores/xacthucStore';

export default {
    setup() {
        const authStore = useAuthStore();
        const user = computed(() => ({
            role: authStore.role,
            username: authStore.userData?.HoTenDG || authStore.userData?.HoTenNV || 'User'
        }));

        const currentYear = new Date().getFullYear();

        return {
            user,
            currentYear
        };
    }
};
</script>

<style scoped>
.footer {
    background: linear-gradient(90deg, #36d1dc, #5b86e5, #00b09b);
    color: #ffffff;
    padding-top: 40px;
    font-family: Arial, sans-serif;
    margin-top: 20px;
}

.footer-brand .brand-link {
    /* text-align: center; */
    color: #ffffff;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
}

.footer-brand .brand-link:hover {
    color: #ffb6c1;
}

.description {
    font-size: 0.9rem;
    margin-top: 10px;
    opacity: 0.9;
}

.footer-links h5,
.footer-contact h5 {
    font-size: 1.2rem;
    margin-bottom: 15px;
}

.footer-links ul,
.footer-contact ul {
    list-style: none;
    padding: 0;
}

.footer-links li,
.footer-contact li {
    margin-bottom: 10px;
}

.footer-links a {
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: #ffb6c1;
}

.footer-contact i {
    font-size: 1rem;
}

.sub-footer {
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
    /* padding: 2px 0; */
    font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {

    .main-footer .col-sm-6,
    .main-footer .col-sm-12 {
        margin-bottom: 20px;
    }

    .footer-brand {
        text-align: center;
    }

    .footer-links,
    .footer-contact {
        text-align: center;
    }
}
</style>