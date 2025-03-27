// NhanVienView.vue
<template>
  <div class="navbar-container mb-3 mt-8">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid justify-content-end">
        <h1 class="me-auto text-head fs-1 fw-bold" style="text-align: center !important; color: #1e3a8a;">
          DANH MỤC NHÂN VIÊN
        </h1>
        <router-link v-if="user?.role === 'nhanvien' || user?.role === 'employee'" :to="{ name: 'ThemNVView' }"
          class="btn btn-create me-3 fs-6 fw-bold rounded-3">
          <i class="fa-solid fa-plus"></i>
          Thêm Nhân Viên
        </router-link>
        <form class="d-flex" @submit.prevent="handleSearch">
          <input class="form-control me-2" type="search" placeholder="Tìm kiếm nhân viên" aria-label="Search"
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
  <div v-else-if="filteredDanhSach.length === 0" class="alert alert-info text-center">
    <i class="bi bi-info-circle me-2"></i>Không có nhân viên nào.
  </div>

  <!-- Bảng danh sách nhân viên -->
  <div v-else class="table-responsive">
    <table class="table table-striped table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Mã Nhân Viên</th>
          <th scope="col">Họ Lót</th>
          <th scope="col">Tên</th>
          <th scope="col">Email</th>
          <th scope="col">Chức Vụ</th>
          <th scope="col">Số Điện Thoại</th>
          <th scope="col">Chỉnh Sửa</th>
          <th scope="col">Xóa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredDanhSach" :key="item._id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.MSNV }}</td>
          <td>{{ item.HoLot }}</td>
          <td>{{ item.Ten }}</td>
          <td>{{ item.Email }}</td>
          <td>{{ item.ChucVu }}</td>
          <td>{{ item.SoDienThoai }}</td>
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
import { getAllNV } from '/src/services/nhanVienApiService.js'; // Giả định API lấy danh sách nhân viên

export default {
  name: 'NhanVienView',
  setup() {
    const authStore = useAuthStore();
    const textSearch = ref('');
    const danhSachNhanVien = ref([]);
    const filteredDanhSach = ref([]);
    const loading = ref(false);
    const user = ref({});

    user.value = authStore.userData;

    onMounted(async () => {
      await loadDanhSachNhanVien();
    });

    const loadDanhSachNhanVien = async () => {
      loading.value = true;
      try {
        const response = await getAllNV(); // Gọi API lấy danh sách nhân viên
        console.log('Danh sách nhân viên từ server:', response.data);
        danhSachNhanVien.value = response.data.data; // Lấy mảng từ response.data.data
        filteredDanhSach.value = danhSachNhanVien.value; // Ban đầu hiển thị toàn bộ danh sách
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhân viên:', error);
        alert('Không thể tải danh sách nhân viên: ' + (error.message || 'Lỗi không xác định'));
      } finally {
        loading.value = false;
      }
    };

    const handleSearch = () => {
      filteredDanhSach.value = danhSachNhanVien.value.filter(item =>
        item.MSNV.toLowerCase().includes(textSearch.value.toLowerCase()) ||
        item.HoLot.toLowerCase().includes(textSearch.value.toLowerCase()) ||
        item.Ten.toLowerCase().includes(textSearch.value.toLowerCase()) ||
        item.Email.toLowerCase().includes(textSearch.value.toLowerCase()) ||
        item.ChucVu.toLowerCase().includes(textSearch.value.toLowerCase())
      );
    };

    return {
      textSearch,
      filteredDanhSach,
      loading,
      user,
      handleSearch,
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