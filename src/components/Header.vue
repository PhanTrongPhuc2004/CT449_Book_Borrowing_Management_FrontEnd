<template>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <router-link class="navbar-brand fs-4 fw-bold" to="/">
                <i class="fa-solid fa-book"></i>
                Hệ thống quản lý mượn sách
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarLibraryBook"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarLibraryBook">
                <!-- Left -->
                <ul class="navbar-nav me-auto mb-0 ms-4 mb-lg-0">
                    <li class="nav-item" :class="{ active: activeItem === 'home' }" @click="setActive('home')">
                        <router-link class="nav-link" aria-current="page" to="/">
                            <i class="fa-solid fa-house me-1"></i>
                            Trang Chủ
                        </router-link>
                    </li>
                    <li class="nav-item ms-4" :class="{ active: activeItem === 'books' }" @click="setActive('books')">
                        <router-link class="nav-link " to="/sach">
                            <i class="fa-solid fa-book-open"></i>
                            Sách
                            <!-- {{ user }} -->
                        </router-link>
                    </li>
                    <li class="nav-item ms-4" :class="{ active: activeItem === 'books-borrowed' }"
                        @click="setActive('books-borrowed')">
                        <router-link class="nav-link " to="/sachmuon">
                            <i class="fa-solid fa-bookmark"></i>
                            Sách Mượn
                        </router-link>
                    </li>
                   
                </ul>
                <!-- Right -->
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 navbar-right">
                    <li class="nav-item" v-if="!user.isAuthenticated" :class="{ active: activeItem === 'login' }"
                        @click="setActive('login')">
                        <router-link class="nav-link me-2" aria-current="page" to="/dangnhap">
                            <i class="fa-solid fa-right-to-bracket"></i>
                            Đăng nhập
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="!user.isAuthenticated" :class="{ active: activeItem === 'Đăng ký' }"
                        @click="setActive('Đăng ký')">
                        <router-link class="nav-link" to="/dangky">
                            <i class="fa-solid fa-user-plus"></i>
                            Đăng ký
                        </router-link>
                    </li>
                    <li class="nav-item dropdown dropdown-custom" v-if="user.isAuthenticated">
                        <a class="nav-link dropdown-toggle active fw-bold" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="navbar-username">
                                <i class="fa-solid fa-user icon-user"></i>
                                <span>{{ user.username }}</span>
                            </span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><router-link class="dropdown-item" to="/taiKhoan">Hồ sơ</router-link></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li v-if="user.role === 'nhanvien'">
                                <router-link class="dropdown-item" to="/quanly">
                                    Quản lý
                                </router-link>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><button class="dropdown-item" @click="handleLogout">Đăng xuất</button></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '/src/stores/xacthucStore.js';
import { useRouter, useRoute } from 'vue-router';

export default {
    setup() {
        const authStore = useAuthStore();
        const user = computed(() => ({
            role: authStore.role,
            username: authStore.userData?.HoTenDG || authStore.userData?.HoTenNV, // Tùy thuộc vào dữ liệu trả về
            isAuthenticated: authStore.isAuthenticated,
        }));
        const activeItem = ref('');
        const router = useRouter();
        const route = useRoute();

        const setActive = (item) => {
            activeItem.value = item;
        }

        const handleLogout = async () => {
            // console.log('Logout');
            await authStore.logout();
            router.push('/');
        };

        onMounted(() => {
            activeItem.value = 'home';
        });

        watch(route, (newRoute) => {
            if (newRoute.path === '/') {
                activeItem.value = 'home';
            } else {
                const pathSegments = newRoute.path.split('/')[1];
                activeItem.value = pathSegments;
            }
        });

        return {
            user,
            authStore,
            activeItem,
            setActive,
            handleLogout,
            router,
        };
    }
};
</script>
<style scoped>
.dropdown-custom .dropdown-menu {
    left: 10px;
    width: 150px;
    text-align: center;
    background: linear-gradient(90deg,#36d1dc, #5b86e5, #00b09b) !important;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-custom .dropdown-item {
    padding: 10px 20px;
    font-size: 16px;
    color: #ffffff;
}

.dropdown-custom .dropdown-item:hover {
    background-color: white;
    font-weight: bold;
    color: purple;
}

.nav-link {
    font-size: 20px;
    color: #ffffff;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: #FFB6C1 !important;
    font-weight: bolder;
}

.navbar-toggler {
    border: none;
    outline: none;
}

.navbar-toggler-icon {
    transition: transform 0.3s ease;
}

.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
    transform: rotate(90deg);
}

.navbar {
    padding: 1rem 2rem;
    height: 75px !important;
    background: linear-gradient(90deg,
            #36d1dc,
            #5b86e5,
            #00b09b);
}

.navbar-brand {
    font-size: 1.5rem;
    color: #ffffff;
}

.navbar-brand:hover {
    color: #FFB6C1;
}

.navbar-right {
    margin-right: 15px;
}

.icon-user {
    margin-right: 8px;
}

.nav-item.active .nav-link {
    color: #ffffff;
    font-weight: bold;
}

.active>* {
    color: #FFB6C1 !important;
}

.navbar-username {
    color: #ffffff !important;
}
</style>