// DanhMucView.vue
<template>
  <div class="navbar-container mb-3 mt-8">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid justify-content-end">
        <h1 class="me-auto text-head fs-1 fw-bold" style="text-align: center !important; color: #1e3a8a;">
          DANH MỤC SÁCH
        </h1>
        <router-link v-if="user?.role === 'nhanvien' || user?.role === 'employee'" :to="{ name: 'ThemDMView' }"
          class="btn btn-create me-3 fs-6 fw-bold rounded-3">
          <i class="fa-solid fa-plus"></i>
          Thêm Danh Mục
        </router-link>
        <form class="d-flex" @submit.prevent="handleSearch">
          <input class="form-control me-2" type="search" placeholder="Tìm kiếm danh mục" aria-label="Search"
            v-model="textSearch">
          <button class="btn btn-search" type="submit">Tìm</button>
        </form>
      </div>
    </nav>
  </div>

  <!-- Hiển thị loading khi đang tải dữ liệu -->
  <div v-if="loading" class="text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Đang tải...</span>
    </div>
  </div>

  <!-- Hiển thị thông báo khi không có dữ liệu -->
  <div v-else-if="filteredDanhMuc.length === 0" class="alert alert-info text-center">
    <i class="bi bi-info-circle me-2"></i>Không có danh mục sách nào.
  </div>

  <!-- Bảng danh sách danh mục -->
  <div v-else class="table-responsive">
    <table class="table table-striped table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Mã Danh Mục</th>
          <th scope="col">Tên Danh Mục</th>
          <th scope="col">Chỉnh Sửa</th>
          <th scope="col">Xóa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredDanhMuc" :key="item._id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.MaDanhMuc }}</td>
          <td>{{ item.TenDanhMuc }}</td>
          <td>
            <button class="btn btn-warning btn-sm" @click="traSach(item.MaSach)"
              style="background-color: rgb(255, 193, 7); border-color: rgb(255, 193, 7); color: white; font-weight: bold;">
              <i class="bi bi-check-circle me-1"></i>Chỉnh sửa
            </button>
          </td>
          <td>
            <button class="btn btn-alert btn-sm" @click="traSach(item.MaSach)"
              style="background-color: rgb(220, 53, 69); border-color: rgb(220, 53, 69); color: white; font-weight: bold;">
              <i class="bi bi-check-circle me-1"></i>Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '/src/stores/xacThucStore.js';
import { getAllBooks } from '/src/services/danhMucSachApiService.js'; // Giả định có API lấy danh mục

export default {
  name: 'DanhMucView',
  setup() {
    const textSearch = ref('');
    const authStore = useAuthStore();
    const allDanhMuc = ref([]);
    const filteredDanhMuc = ref([]);
    const user = ref({});
    const loading = ref(false);

    user.value = authStore.userData;

    onMounted(async () => {
      await loadDanhMuc();
    });

    const loadDanhMuc = async () => {
      loading.value = true;
      try {
        const response = await getAllBooks(); // Gọi API để lấy danh mục
        console.log('Danh sách danh mục từ server:', response.data);
        allDanhMuc.value = response.data.data; // Lấy mảng từ response.data.data
        filteredDanhMuc.value = allDanhMuc.value; // Ban đầu hiển thị toàn bộ danh sách
      } catch (error) {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      } finally {
        loading.value = false;
      }
    };

    const handleSearch = () => {
      filteredDanhMuc.value = allDanhMuc.value.filter(item =>
        item.TenDanhMuc.toLowerCase().includes(textSearch.value.toLowerCase()) ||
        item.MaDanhMuc.toLowerCase().includes(textSearch.value.toLowerCase())
      );
    };

    return {
      textSearch,
      user,
      filteredDanhMuc,
      handleSearch,
      loading,
    };
  },
};
</script>

<style scoped>
.btn-search {
  background-color: #36d1dc;
  color: white;
  border: none;
}
.btn-search:hover {
  background-color: #2cb7c2;
}
.btn-create {
  background-color: #1e3a8a;
  color: white;
}
.btn-create:hover {
  background-color: #152c6e;
}
</style>