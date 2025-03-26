<template>
    <div class="not-found">
        <h1>404 - Trang Không Tìm Thấy</h1>
        <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <div class="illustration">
            <img src="@/assets/404-illustration.png" alt="404 Illustration" />
        </div>
        <div class="actions">
            <router-link to="/" class="btn-home">Quay về Trang Chủ</router-link>
            <button @click="goBack" class="btn-back">Quay Lại</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    methods: {
        goBack() {
            this.$router.go(-1); // Quay lại trang trước đó
        }
    }
};
</script>

<style scoped>
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 75vh;
    text-align: center;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    font-size: 48px;
    color: #ff4444;
    margin-bottom: 10px;
}

p {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
}

.illustration img {
    max-width: 300px;
    margin-bottom: 30px;
}

.actions {
    display: flex;
    gap: 15px;
}

.btn-home,
.btn-back {
    padding: 10px 20px;
    font-size: 16px;
    text-decoration: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-home {
    background-color: #36d1dc;
    color: white;
}

.btn-home:hover {
    background-color: #00b09b;
}

.btn-back {
    background-color: #5b86e5;
    color: white;
    border: none;
}

.btn-back:hover {
    background-color: #00b09b;
}

img {
    background-color: white;
}
</style>