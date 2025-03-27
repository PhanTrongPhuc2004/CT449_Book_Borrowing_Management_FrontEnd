<template>
  <div class="navbar-container mb-3 mt-8">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid justify-content-end">
        <h1 class="me-auto text-head fs-1 fw-bold" style="text-align: center !important; color: #1e3a8a;">
          DANH MỤC MƯỢN TRẢ SÁCH
        </h1>
        <form class="d-flex" @submit.prevent="handleSearch">
          <input class="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search"
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
    <i class="bi bi-info-circle me-2"></i>Không có phiếu mượn trả nào.
  </div>

  <!-- Bảng danh sách mượn trả -->
  <div v-else class="table-responsive">
    <table class="table table-striped table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Mã Độc Giả</th>
          <th scope="col">Mã Sách</th>
          <th scope="col">Ngày Mượn</th>
          <th scope="col">Ngày Trả</th>
          <th scope="col">Trạng Thái</th>
          <th scope="col">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredDanhSach" :key="item._id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.MaDG }}</td>
          <td>{{ item.MaSach }}</td>
          <td>{{ formatDate(item.NgayMuon) }}</td>
          <td>{{ item.NgayTra ? formatDate(item.NgayTra) : 'Chưa trả' }}</td>
          <td>
            <span :class="item.TrangThai === 'Đang mượn' || item.TrangThai === 'Yêu cầu' ? 'badge bg-warning text-dark' : 'badge bg-success'" style=" width: 90px;">
              <i :class="item.TrangThai === 'Đang mượn' || item.TrangThai === 'Yêu cầu' ? 'bi bi-hourglass-split me-1' : 'bi bi-check-circle me-1'">
              </i>
              {{ item.TrangThai }}
            </span>
          </td>
          <td>
            <button class="btn btn-warning btn-sm" @click="traSach(item.MaSach)"
              :disabled="item.TrangThai !== 'Yêu cầu'"
              style="background-color: #36d1dc; border-color: #36d1dc; color: white; font-weight: bold;">
              <i class="bi bi-check-circle me-1"></i>Duyệt
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useAuthStore } from '/src/stores/xacThucStore.js';
import { getUseBorrowings, returnBorrowings, getAllBorrowings} from '/src/services/muonTraApiService.js';

export default {
  name: 'MuonTraView',
  data() {
    return {
      authStore: useAuthStore(),
      danhSachMuonTra: [],
      filteredDanhSach: [],
      textSearch: '',
      loading: false,
    };
  },
  mounted() {
    this.loadDanhSachMuonTra();
  },
  watch: {
    'authStore.userData'(newValue, oldValue) {
      if (newValue !== oldValue && this.authStore.userData) {
        this.loadDanhSachMuonTra();
      }
    },
    textSearch(newValue) {
      this.handleSearch(newValue);
    },
  },
  methods: {
    // Lấy danh sách mượn trả từ server
    async loadDanhSachMuonTra() {
      this.loading = true;
      try {
        // const MaDG = this.authStore.userData.MaDG;
        const response = await getAllBorrowings();
        console.log('Danh sách mượn trả từ server:', response.data);
        if (response.data.status === 'success') {
          this.danhSachMuonTra = response.data.data; // Lấy mảng từ response.data.data
          this.filteredDanhSach = this.danhSachMuonTra; // Ban đầu hiển thị toàn bộ danh sách
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách mượn trả:', error);
        alert('Không thể tải danh sách mượn trả: ' + (error.message || 'Lỗi không xác định'));
      } finally {
        this.loading = false;
      }
    },

    // Tìm kiếm theo mã độc giả hoặc mã sách
    handleSearch(searchText = this.textSearch) {
      this.filteredDanhSach = this.danhSachMuonTra.filter(item =>
        item.MaDG.toLowerCase().includes(searchText.toLowerCase()) ||
        item.MaSach.toLowerCase().includes(searchText.toLowerCase())
      );
    },

    // Định dạng ngày tháng
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('vi-VN', options);
    },

    // Xử lý trả sách
    async traSach(maSach) {
      if (!confirm('Bạn có chắc muốn trả sách này không?')) return;

      try {
        const response = await returnBorrowings({
          MaSach: maSach,
          MaDG: this.authStore.userData.MaDG,
        });

        if (response.data.status === 'success') {
          alert('Trả sách thành công!');
          await this.loadDanhSachMuonTra(); // Tải lại danh sách sau khi trả sách
        }
      } catch (error) {
        console.error('Lỗi khi trả sách:', error);
        alert('Trả sách thất bại: ' + (error.response?.data?.message || 'Lỗi không xác định'));
      }
    },
  },
};
</script>

<style scoped>
.book-image {
  width: 50px;
  height: auto;
}
.btn-search {
  background-color: #36d1dc;
  color: white;
  border: none;
}
.btn-search:hover {
  background-color: #2cb7c2;
}
</style>