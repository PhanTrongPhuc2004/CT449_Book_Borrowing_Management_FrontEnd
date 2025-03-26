<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Thêm sách mới</h2>
    <form @submit.prevent="saveBook">
      <div v-for="field in fieldsConfig" :key="field.key" class="mb-3">
        <label :for="field.key" class="form-label">{{ field.label }}</label>
        <template v-if="field.type === 'text'">
          <input 
            :id="field.key" 
            :name="field.key" 
            v-model="bookForm[field.key]" 
            type="text" 
            :disabled="field.readonly" 
            class="form-control"
          />
        </template>
        <template v-else-if="field.type === 'number'">
          <input 
            :id="field.key" 
            :name="field.key" 
            v-model.number="bookForm[field.key]" 
            type="number" 
            class="form-control"
          />
        </template>
      </div>

      <div class="mt-3 d-flex justify-content-center">
        <button type="button" class="btn btn-secondary" @click="cancelForm">Thoát</button>
        <button type="button" class="btn btn-warning me-2" @click="clearForm">Xóa</button>
        <button type="submit" class="btn btn-primary me-2">Lưu</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '/src/utils/axiosApiService.js'; // Giả sử đã cấu hình Axios instance

const bookFields = [
  { key: 'TenSach', label: 'Tên sách', type: 'text' },
  { key: 'MaNXB', label: 'Mã NXB', type: 'text' }, // Có thể thay bằng select nếu có API danh sách NXB
  { key: 'MaDanhMuc', label: 'Mã danh mục', type: 'text' }, // Có thể thay bằng select nếu có API danh sách danh mục
  { key: 'DonGia', label: 'Đơn giá', type: 'number' },
  { key: 'SoQuyen', label: 'Số quyển', type: 'number' },
  { key: 'NamXuatBan', label: 'Năm xuất bản', type: 'number' },
  { key: 'TacGia', label: 'Tác giả', type: 'text' },
  { key: 'HinhAnh', label: 'URL hình ảnh', type: 'text' },
];

export default {
  name: 'ThemSachView',
  data() {
    return {
      bookForm: {
        TenSach: '',
        MaNXB: '',
        MaDanhMuc: '',
        DonGia: 0,
        SoQuyen: 0,
        NamXuatBan: 0,
        TacGia: '',
        HinhAnh: ''
      },
      fieldsConfig: bookFields,
    };
  },
  methods: {
    async saveBook() {
      try {
        const axiosInstance = axios("/api");
        const response = await axiosInstance.post('/sach', this.bookForm);

        if (response.data.success) {
          alert('Thêm sách thành công!');
          this.clearForm(); // Làm trống form sau khi lưu thành công
        } else {
          alert('Thêm sách thất bại: ' + (response.data.message || 'Lỗi không xác định'));
        }
      } catch (error) {
        console.error('Lỗi khi thêm sách:', error);
        alert('Lỗi kết nối server: ' + error.message);
      }
    },
    clearForm() {
      this.bookForm = {
        MaSach: '',
        TenSach: '',
        MaNXB: '',
        MaDanhMuc: '',
        DonGia: 0,
        SoQuyen: 0,
        NamXuatBan: 0,
        TacGia: '',
        HinhAnh: ''
      };
    },
    cancelForm() {
        this.$router.push({ name: 'SachView' });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.form-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
}

.btn {
  padding: 10px 20px;
  margin: 0 5px;
}
</style>