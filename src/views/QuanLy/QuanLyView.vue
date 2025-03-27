<template>
    <div class="admin-layout">
        <!-- Nội dung chính gồm sidebar và main -->
        <div class="content-wrapper">
            <admin-sidebar @toggle-sidebar="handleToggleSidebar" @change-route="handleChangeRoute" />
            <main class="main-content" :class="{ 'collapsed': isSidebarCollapsed }">
                <div class="default-content">
                    <h2>Chào mừng đến với trang Quản lý</h2>
                    <p>Vui lòng chọn một mục từ sidebar để thực hiện quản lý</p>
                    <div class="illustration">
                        <img src="/src/assets/AdminPage.png" alt="AdminPage img" />
                    </div>
                </div>
                <router-view />
            </main>

        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AdminSidebar from '/src/components/AdminSidebar.vue';

export default {
    components: {
        AdminSidebar,
    },
    name: 'QuanLyView',
    setup() {
        const router = useRouter();
        const isSidebarCollapsed = ref(false);

        const handleToggleSidebar = (collapsed) => {
            isSidebarCollapsed.value = collapsed;
        };

        const handleChangeRoute = (routeName) => {
            router.push({ name: routeName }); // Chuyển route tương ứng
        };

        // Đặt route mặc định khi vào QuanLyView (tùy chọn)
        if (!router.currentRoute.value.name) {
            router.push({ name: 'QuanLyView' });
        }

        return { isSidebarCollapsed, handleToggleSidebar, handleChangeRoute };
    }
};
</script>

<style scoped>
.default-content {
    text-align: center;
    padding: 20px;
}
.admin-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content-wrapper {
    display: flex;
    flex: 1;
    height: 300px;

}

.main-content {
    margin-left: 250px;
    margin-bottom: 20px;
    width: 100vw;
    height: 500px;
    padding: 10px;
    transition: all 0.3s ease;
    background-color: white;
    /* Nền nhẹ để phân biệt */
}

.main-content.collapsed {
    margin-left: 60px;
    width: calc(100% - 60px);
}
.illustration img {
    max-width: 300px;
    margin-bottom: 30px;
}
</style>