<template>
    <div class="card book-card">
        <img :src="`${book.HinhAnh}`" class="card-img-top" alt="Book Image" />
        <div class="card-body p-2">
            <h5 class="card-title text-primary fw-bold fs-5">
                <router-link :to="`/sach/${book._id}`" class="no-underline">{{ book.TenSach }}</router-link>
            </h5>
            <p class="card-text"><strong>Tác giả:</strong> {{ book.TacGia || 'Unknown' }}</p>
            <p class="card-text"><strong>Giá:</strong> {{ book.DonGia }} VND</p>
            <p class="card-text"><strong>Số lượng:</strong> {{ book.SoQuyen }}</p>
            <p class="card-text"><strong>Nhà xuất bản:</strong> {{ book.MaNXB.TenNXB }}</p>
            <p class="card-text"><strong>Danh mục:</strong> {{ book.MaDanhMuc.TenDanhMuc  }}</p>
            <p class="card-text"><strong>Năm phát hành:</strong> {{ book.NamXuatBan }}</p>
        </div>
        <hr>
        <div class="d-flex justify-content-end mt-2">
            <router-link class="btn btn-danger btn-sm fs-6 fw-normal"
                v-if="(user.role === 'nhanvien')"
                :to="{ name: 'SuaSachView', params: { id: book._id } }">Chỉnh sửa</router-link>
            <!-- <router-link class="btn btn-primary btn-sm fs-6 fw-normal"
                :to="{ name: 'ChiTietSachView', params: { id: book._id } }">Chi Tiết</router-link> -->
            <button :disabled=" `${user.role}` === null" class="btn btn-borrow btn-sm fs-6 fw-normal" data-bs-toggle="modal"
                :data-bs-target="'#' + book._id">Mượn</button>
            </div>
            <!-- {{user.userData}} -->

        <!-- Modal -->
        <div class="modal fade" :id="book._id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">XÁC NHẬN MƯỢN SÁCH</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-0">
                            <label class="form-label"><strong>Tên sách:</strong></label>
                            <p class="form-control-plaintext mt-0">{{ book.TenSach }}</p>
                        </div>
                        <div class="mb-0">
                            <label class="form-label"><strong>Tác giả:</strong></label>
                            <p class="form-control-plaintext">{{ book.TacGia || 'Unknown' }}</p>
                        </div>
                        <div class="mb-0">
                            <label class="form-label"><strong>Giá:</strong></label>
                            <p class="form-control-plaintext">{{ book.DonGia }} VND</p>
                        </div>
                        <div class="mb-0">
                            <label class="form-label"><strong>Số quyển:</strong></label>
                            <p class="form-control-plaintext">{{ book.SoQuyen }}</p>
                        </div>
                        <div class="mb-0">
                            <label class="form-label"><strong>Năm phát hành:</strong></label>
                            <p class="form-control-plaintext">{{ book.NamXuatBan }}</p>
                        </div>
                        <div class="mb-0">
                            <label class="form-label"><strong>Nhà xuất bản:</strong></label>
                            <p class="form-control-plaintext">{{ book.MaNXB.TenNXB }}</p>
                        </div>
                        <div class="mb-0">
                            <label class="form-label"><strong>Danh mục:</strong></label>
                            <p class="form-control-plaintext">{{ book.MaDanhMuc.TenDanhMuc }}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary" @click="handleBorrow">Mượn</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End modal -->
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useAuthStore } from '/src/stores/xacThucStore.js';
import { createBorrowings } from '/src/services/muonTraApiService.js'; // Đảm bảo import đúng API

export default {
    props: {
        book: Object,
    },
    setup(props) {
        const authStore = useAuthStore();
        const user = authStore;
        

        const handleBorrow = async () => {
            try {
                // alert(props.book.MaSach + user.userData.MaDG)
                await createBorrowings({ MaSach: props.book.MaSach, MaDG: user.userData.MaDG });
                alert("Yêu cầu mượn sách thành công, vui lòng chờ xác nhận từ thủ thư!");
                // Tải lại trang sau khi mượn xong
                location.reload();
            } catch (error) {
                alert(error.response.data.message);
            }
        };

        return {
            user,
            handleBorrow,
        };
    },
}
</script>

<style scoped>
.book-card {
    width: 15rem;
    height: 480px;
    overflow: hidden;
}

.card-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 1.2em;
    margin-bottom: 0;
    text-align: center;
}

.no-underline {
    text-decoration: none;
}

.card-title:hover {
    color: #4921f3 !important;
    text-decoration: none;
    cursor: pointer;
}

.card-img-top {
    height: 250px;
    object-fit: cover;
}

.card-body {
    flex: none;
    font-size: 0.7rem;
}

.card-text {
    margin-bottom: 5px;
}

.btn {
    margin-right: 10px;
    font-size: 1.1rem !important;
}

.btn-borrow {
    color: white;
    background-color: #36d1dc;
    
}

.btn-borrow:hover {
    background-color: #5b86e5;
}

.btn:last-child {
    margin-right: 10px;
}

button:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
    opacity: 0.6;
}

hr {
    margin: 0;
    margin-bottom: 5px;
}

.book-info-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 15px;
}

.book-info {
    margin-bottom: 10px;
}

.book-info label {
    font-weight: bold;
}

.book-info p {
    margin-bottom: 5px;
}
.btn-primary {
    background-color: #36d1dc;
    border-color: #36d1dc;
}

.btn-primary:hover {
    background-color: #5b86e5;
    border-color: #5b86e5;
}
</style>
