<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4" style="color: #007bff; font-weight: bold; color: #1e3a8a; font-size: 2rem;">
      <i class="bi bi-book me-2" style="font-weight: bold;"></i>SÁCH MƯỢN CỦA BẠN
    </h2>
    <!-- <h6>{{authStore.token}}</h6> -->
    <!-- Hiển thị loading khi đang tải dữ liệu -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Đang tải...</span>
      </div>
    </div>

    <!-- Hiển thị thông báo khi không có sách mượn -->
    <div v-else-if="danhSachSach.length === 0" class="alert alert-info text-center">
      <i class="bi bi-info-circle me-2"></i>Không có sách nào đang mượn.
    </div>

    <!-- Bảng danh sách sách mượn -->
    <div v-else class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mã Sách</th>
            <th scope="col">Tên Sách</th>
            <th scope="col">Ảnh Sách</th>
            <th scope="col">Ngày Mượn</th>
            <th scope="col">Trạng Thái</th>
            <th scope="col">Trả Sách</th>
            <th scope="col">Hủy Yêu Cầu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in danhSachSach" :key="item._id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.MaSach }}</td>
            <td>{{ item.TenSach || 'Chưa có thông tin' }}</td>
            <td>
              <img :src="item.HinhAnh" alt="Book Image" class="book-image">
            </td>
            <td>{{ formatDate(item.NgayMuon) }}</td>
            <td>
              <span class="badge bg-warning text-dark"
                :style="item.TrangThai === 'Đang mượn' ? 'background-color: green !important; color: white !important;' : 'background-color: rgb(255, 193, 7) !important; color: white !important;'">
                <i class="bi bi-hourglass-split me-1"></i>{{ item.TrangThai }}
              </span>
            </td>
            <td>
              <button class="btn btn-success btn-sm" @click="traSach(item.MaSach)"
                :disabled="item.TrangThai !== 'Đang mượn'"
                style="background-color: #36d1dc; border-color: #36d1dc; color: white; font-weight: bold;">
                <i class="bi bi-check-circle me-1"></i>Trả sách
              </button>
            </td>
            <td>
              <button class="btn btn-success btn-sm" @click="xoaYeuCau(item.MaSach)"
                :disabled="item.TrangThai !== 'Yêu cầu'"
                style="background-color: rgb(220, 53, 69); border-color: rgb(220, 53, 69); color: white; font-weight: bold; width: 80px;">
                <i class="bi bi-check-circle me-1"></i>Hủy
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '/src/stores/xacThucStore.js';
import { getUseBorrowings, returnBorrowings, deleteBorrowings } from '/src/services/muonTraApiService.js';
import { getSingleBook } from '/src/services/sachApiService.js';

export default {
  name: 'SachMuonView',
  data() {
    return {
      authStore: useAuthStore(),
      danhSachMuon: [],
      danhSachSach: [],
      loading: false,
    };
  },
  mounted() {
    if (this.authStore.userData?.MaDG) this.loadDanhSachMuon();
  },
  watch: {
    'authStore.userData'(newValue, oldValue) {
      if (newValue !== oldValue) {
        if(this.authStore.userData?.MaDG) {
          this.loadDanhSachMuon();
        }
      }
    }
  },
  methods: {
    // Lấy danh sách sách đang mượn và thông tin sách
    async loadDanhSachMuon() {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        const MaDG = authStore.userData.MaDG;
        // Gọi API lấy danh sách mượn
        const response = await getUseBorrowings(MaDG);
        console.log('Danh sách mượn từ server:', response.data);
        if (response.data.status === 'success') {
          this.danhSachMuon = response.data.data.danhSachMuon;
          await this.loadDanhSachSach(); // Gọi hàm lấy thông tin sách
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách mượn:', error);
        alert('Không thể tải danh sách sách mượn: ' + (error.message || 'Lỗi không xác định'));
      } finally {
        this.loading = false;
      }
    },

    // Lấy thông tin sách và đẩy vào danhSachSach
    async loadDanhSachSach() {
      this.danhSachSach = []; // Reset mảng trước khi đẩy dữ liệu mới
      try {
        const promises = this.danhSachMuon.map(async (item) => {
          const response = await getSingleBook(item.MaSach);
          console.log(`Thông tin sách cho MaSach ${item.MaSach}:`, response.data);
          return { ...item, ...response.data }; // Gộp dữ liệu sách vào bản ghi mượn
        });

        this.danhSachSach = await Promise.all(promises); // Chờ tất cả promise hoàn thành và gán vào danhSachSach
        console.log('Danh sách sách sau khi gộp:', this.danhSachSach);
      } catch (error) {
        console.error('Lỗi tổng quát khi lấy thông tin sách:', error);
        alert('Không thể tải thông tin sách: ' + (error.message || 'Lỗi không xác định'));
      }
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
        const authStore = useAuthStore();
        const response = await returnBorrowings({
          MaSach: maSach,
          MaDG: authStore.userData.MaDG,
        });

        if (response.data.status === 'success') {
          alert('Trả sách thành công!');
          await this.loadDanhSachMuon(); // Tải lại danh sách sau khi trả sách
        }
      } catch (error) {
        console.error('Lỗi khi trả sách:', error);
        alert('Trả sách thất bại: ' + (error.response?.data?.message || 'Lỗi không xác định'));
      }
    },
    // Xử lý hủy yêu cầu
    async xoaYeuCau(maSach) {
      if (!confirm('Bạn có chắc muốn hủy yêu cầu mượn sách này không?')) return;

      try {
        const authStore = useAuthStore();
        const response = await deleteBorrowings({
          MaSach: maSach,
          MaDG: authStore.userData.MaDG,
        });

        if (response.data.status === 'success') {
          alert('Hủy yêu cầu thành công!');
          // await this.loadDanhSachMuon();
          // Tải lại danh sách sau khi hủy yêu cầu
        }
        location.reload(); // Tải lại trang để cập nhật danh sách
      } catch (error) {
        console.error('Lỗi khi hủy yêu cầu:', error);
        alert('Hủy yêu cầu thất bại: ' + (error.response?.data?.message || 'Lỗi không xác định'));
      }
    },
  },
};
</script>

<style scoped>
/* CSS cố định kích thước cột và xuống dòng khi dữ liệu dài */
.table th,
.table td {
  text-align: center;
  vertical-align: middle;
  max-width: 200px; /* Giới hạn chiều rộng tối đa của cột */
  min-width: 100px; /* Giới hạn chiều rộng tối thiểu của cột */
  overflow-wrap: break-word; /* Dữ liệu dài sẽ xuống dòng */
  white-space: normal; /* Cho phép xuống dòng thay vì hiển thị trên một dòng */
  padding: 8px; /* Khoảng cách trong ô */
}

/* Cột số thứ tự nhỏ hơn */
.table th:first-child,
.table td:first-child {
  max-width: 50px;
  width: 50px;
}

/* Cột hành động */
.table th:last-child,
.table td:last-child {
  max-width: 120px;
  width: 120px;
}

/* Cột ảnh sách */
.book-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

/* Tùy chỉnh nút */
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

/* Tùy chỉnh badge */
.badge {
  font-size: 0.9rem;
}

/* Tùy chỉnh container */
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 100px;
  margin-top: 80px !important;
  min-height: 500px;
}
</style>