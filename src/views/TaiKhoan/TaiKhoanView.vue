<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Thông tin tài khoản</h2>
    <!-- <h6 class="text-center mb-4">{{originalUser}}</h6> -->
    <form @submit.prevent="saveChanges">
      <div v-for="field in fieldsConfig" :key="field.key" class="mb-3">
        <label :for="field.key" class="form-label">{{ field.label }}</label>
        <template v-if="field.type === 'text'">
          <input 
            :id="field.key" 
            :name="field.key" 
            v-model="userForm[field.key]" 
            type="text" 
            :disabled="field.readonly" 
            class="form-control"/>
        </template>
        <template v-else-if="field.type === 'date'">
          <input 
            :id="field.key" 
            :name="field.key" 
            v-model="userForm[field.key]" 
            type="date" 
            class="form-control"
          />
        </template>
        <template v-else-if="field.type === 'select'">
          <select 
            :id="field.key" 
            :name="field.key" 
            v-model="userForm[field.key]" 
            class="form-select">
            <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
          </select>
        </template>
      </div>

      <div class="mt-3 d-flex justify-content-center">
          <button type="button" class="btn btn-secondary" @click="cancelChanges">Hủy bỏ</button>
          <button type="button" class="btn btn-warning me-2" @click="deleteAccount">Đổi mật khẩu</button>
          <button type="submit" class="btn btn-primary me-2">Lưu</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '/src/stores/xacThucStore.js';
import axios from '/src/utils/axiosApiService.js'; // Giả sử đã cấu hình Axios instance

const readerFields = [
  { key: 'MaDG', label: 'Mã độc giả', type: 'text', readonly: true },
  { key: 'Email', label: 'Email', type: 'text' },
  { key: 'HoLot', label: 'Họ Lót', type: 'text' },
  { key: 'Ten', label: 'Tên', type: 'text' },
  { key: 'NgaySinh', label: 'Ngày sinh', type: 'date' },
  { key: 'Phai', label: 'Giới tính', type: 'select', options: ['Nam', 'Nữ', 'Khác'] },
  { key: 'DiaChi', label: 'Địa chỉ', type: 'text' },
  { key: 'DienThoai', label: 'Điện thoại', type: 'text' },
];

const staffFields = [
  { key: 'MSNV', label: 'Mã nhân viên', type: 'text', readonly: true },
  { key: 'Email', label: 'Email', type: 'text' },
  { key: 'HoLot', label: 'Họ lót', type: 'text' },
  { key: 'Ten', label: 'Tên', type: 'text' },
  { key: 'ChucVu', label: 'Chức vụ', type: 'text' },
  { key: 'DiaChi', label: 'Địa chỉ', type: 'text' },
  { key: 'SoDienThoai', label: 'Số điện thoại', type: 'text' },
];

export default {
  name: 'TaiKhoanView',
  data() {
    return {
      userForm: {},
      originalUser: {},
      fieldsConfig: [],
    };
  },
  async mounted() {
    await this.loadUserData();
  },
  methods: {
    async loadUserData() {
      const authStore = useAuthStore();
      const role = authStore.role;
      const endpoint = role === 'docgia' ? '/docgia/ma/' : '/nhanvien/ma/';
      const maUser = role === 'docgia' ? authStore.userData.MaDG : authStore.userData.MSNV;
      console.log('authStore:', authStore.userData);
      try {
        const axiosInstance = axios("/api");
        const response = await axiosInstance.get(endpoint + maUser);
        if (response.data.success) {
          this.originalUser = response.data;
          this.userForm = { ...this.originalUser.data };
          this.fieldsConfig = role === 'docgia' ? readerFields : staffFields;
        } else {
          alert('Không thể tải thông tin tài khoản!');
        }
      } catch (error) {
        console.log('Lỗi khi tải thông tin:', error);
        // alert('Lỗi kết nối server!');
      }
    },
    async saveChanges() {
      try {
        const authStore = useAuthStore();
        const role = authStore.role;
        const endpoint = role === 'docgia' ? '/docgia/' : '/nhanvien/';
        const maUser = this.userForm._id;
        const axiosInstance = axios("/api");
        const response = await axiosInstance.put(endpoint + maUser, this.userForm);

        if (response.data.success) {
          this.originalUser = { ...this.userForm };
          alert('Cập nhật thành công!');
        } else {
          alert('Cập nhật thất bại!');
        }
      } catch (error) {
        console.error(error);
        alert('Lỗi kết nối server!'+ error);
      }
    },
    cancelChanges() {
    //   this.userForm = { ...this.originalUser };
      location.reload();
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

.form-control, .form-select {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
}

.btn {
  padding: 10px 20px;
  margin: 0 5px;
}
</style>