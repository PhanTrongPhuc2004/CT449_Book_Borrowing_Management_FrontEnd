<template>
    <div class="sidebar" :class="{ collapsed: isCollapsed }">
        <div class="sidebar-header">
            <a href="#" class="brand-link toggle-btn" @click.prevent="toggleSidebar">
                <i class="fa-solid fa-star"></i>
                <span v-if="!isCollapsed"> Quản lý Admin</span>
            </a>
        </div>

        <ul class="nav-list">
            <li v-if="user?.role === 'nhanvien'" class="nav-item" :class="{ active: activeItem === 'users1' }"
                @click="setActive('users1')">
                <a href="#" class="nav-link" @click.prevent="$emit('change-route', 'DocGiaView')">
                    <i class="fa-solid fa-users"></i>
                    <span v-if="!isCollapsed">Độc giả</span>
                </a>
            </li>
            <li v-if="user?.role === 'nhanvien'" class="nav-item" :class="{ active: activeItem === 'users2' }"
                @click="setActive('users2')">
                <a href="#" class="nav-link" @click.prevent="$emit('change-route', 'NhanVienView')">
                    <i class="fa-solid fa-users"></i>
                    <span v-if="!isCollapsed">Nhân viên</span>
                </a>
            </li>
            <li v-if="user?.role === 'nhanvien' || user?.role === 'employee'" class="nav-item"
                :class="{ active: activeItem === 'borrowing' }" @click="setActive('borrowing')">
                <a href="#" class="nav-link" @click.prevent="$emit('change-route', 'MuonTraView')">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <span v-if="!isCollapsed">Mượn sách</span>
                </a>
            </li>
            <li v-if="user?.role === 'nhanvien' || user?.role === 'employee'" class="nav-item"
                :class="{ active: activeItem === 'publisher' }" @click="setActive('publisher')">
                <a href="#" class="nav-link" @click.prevent="$emit('change-route', 'NhaXuatBanView')">
                    <i class="fa-regular fa-copy"></i>
                    <span v-if="!isCollapsed">Nhà xuất bản</span>
                </a>
            </li>
            <li v-if="user?.role === 'nhanvien' || user?.role === 'employee'" class="nav-item"
                :class="{ active: activeItem === 'categories' }" @click="setActive('categories')">
                <a href="#" class="nav-link" @click.prevent="$emit('change-route', 'DanhMucView')">
                    <i class="fa-solid fa-list"></i>
                    <span v-if="!isCollapsed">Danh mục sách</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useAuthStore } from '/src/stores/xacthucStore';

export default {
    name: 'AdminSidebar',
    emits: ['toggle-sidebar', 'change-route'],
    setup(props, { emit }) {
        const authStore = useAuthStore();
        const user = computed(() => ({
            role: authStore.role,
            username: authStore.userData?.HoTenDG || authStore.userData?.HoTenNV || 'User'
        }));
        const activeItem = ref('');
        const isCollapsed = ref(false);

        const setActive = (item) => {
            activeItem.value = item;
        };

        const toggleSidebar = () => {
            isCollapsed.value = !isCollapsed.value;
            emit('toggle-sidebar', isCollapsed.value);
        };

        return {
            user,
            activeItem,
            setActive,
            isCollapsed,
            toggleSidebar
        };
    }
};
</script>

<style scoped>
.sidebar {
    width: 250px;
    background: #36d1dc;
    color: #ffffff;
    transition: width 0.3s ease;
    height: calc(68.2vh - 75px);
    margin-top: -5px;
    position: fixed;
    left: 0;
    overflow-y: auto;
}

.sidebar.collapsed {
    width: 60px;
}

.sidebar-header {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.brand-link {
    color: #ffffff;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
}

.brand-link:hover {
    color: #ffb6c1;
}

.toggle-btn {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 1.2rem;
    cursor: pointer;
}

.nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-item {
    padding: 15px 20px;
    transition: background-color 0.3s;
}

.nav-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.nav-link {
    color: #ffffff;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
}

.nav-link i {
    margin-right: 10px;
    width: 20px;
    text-align: center;
}

.nav-link:hover {
    color: #ffb6c1;
}

.nav-item.active .nav-link {
    color: #ffb6c1;
    font-weight: bold;
}

.collapsed .nav-link span {
    display: none;
}

@media (max-width: 768px) {
    .sidebar {
        width: 60px;
    }

    .sidebar:not(.collapsed) {
        width: 250px;
    }

    .nav-link span {
        display: none;
    }

    .sidebar:not(.collapsed) .nav-link span {
        display: inline;
    }
}
</style>