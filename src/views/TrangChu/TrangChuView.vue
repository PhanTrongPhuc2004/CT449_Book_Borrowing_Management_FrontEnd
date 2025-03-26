<template>
    <div class="home-page">
        <div class="welcome-container">
            <h1 class="welcome-title">CHÀO MỪNG BẠN ĐẾN HỆ THỐNG MƯỢN SÁCH</h1>
            <p class="welcome-subtitle">Cùng nhau khám phá một thế giới tri thức vô tận với rất nhiều đầu sách thuộc đủ
                mọi thể loại nào !</p>
        </div>
        <div class="carousel-container">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                        class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/8/9/8934974182375.jpg"
                            class="carousel-image" alt="Book Cover 1">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg"
                            class="carousel-image" alt="Book Cover 2">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/8/9/8932000134749_1.jpg"
                            class="carousel-image" alt="Book Cover 3">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/i/m/image_217480.jpg"
                            class="carousel-image" alt="Book Cover 4">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/b/_/b_a-1-tr_n-l_n-m_i-nh_-_-kh_c-2.jpg"
                            class="carousel-image" alt="Book Cover 5">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/z/5/z5767334826845_2e61b754a821ac7fd232d2553b051dd2.jpg"
                            class="carousel-image" alt="Book Cover 6">

                    </div>
                    <div class="carousel-item">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/i/m/image_195509_1_453.jpg"
                            class="carousel-image" alt="Book Cover 1">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/8/9/8935352612101.jpg"
                            class="carousel-image" alt="Book Cover 2">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/t/r/truog-an-ly-ca-3---cao-son-luu-thuy-01-dd.jpg"
                            class="carousel-image" alt="Book Cover 3">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/8/9/8935325011559.jpg"
                            class="carousel-image" alt="Book Cover 4">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/_/n/_nh_ng-n_i-_au-_t-_o_n_-b_a-1.jpg"
                            class="carousel-image" alt="Book Cover 5">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/n/g/ngay_troi_ve_phia_cu-_2_.jpg"
                            class="carousel-image" alt="Book Cover 6">
                    </div>
                    <div class="carousel-item">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/n/i/ninja-rantaro_bia-truoc_tap48.jpg"
                            class="carousel-image" alt="Book Cover 1">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/n/x/nxbtre_full_12272025_032735.jpg"
                            class="carousel-image" alt="Book Cover 2">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/d/o/doraemon-movie-story-mau_nobita-va-hon-dao-dieu-ki_cuoc-phieu-luu-cua-loai-thu.jpg"
                            class="carousel-image" alt="Book Cover 3">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/o/n/one-piece_bia_tap-1_tb-2025.jpg"
                            class="carousel-image" alt="Book Cover 4">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/i/m/image_241480.jpg"
                            class="carousel-image" alt="Book Cover 5">
                        <img src="https://cdn1.fahasa.com/media/catalog/product/n/x/nxbtre_full_24372024_023745.jpg"
                            class="carousel-image" alt="Book Cover 6">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Trước</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Sau</span>
                </button>
            </div>
        </div>
        <br>
        <div class="welcome-container">
            <router-link class="explore-button" to="/sach">
                Mượn Sách
                <i class="fa-solid fa-magnifying-glass"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TrangChuView'
}
</script>

<style scoped>
/* Tổng thể trang */
.home-page {
    padding: 20px;
    font-family: Arial, sans-serif;
}

/* Phần chào mừng */
.welcome-container {
    text-align: center;
    margin-bottom: 30px;
}

.welcome-title {
    font-size: 2rem;
    font-weight: bold;
    color: #1e3a8a;
    /* Màu xanh đậm */
    margin-bottom: 10px;
    font-weight: bold;
}

.welcome-subtitle {
    font-size: 1.25rem;
    color: #1e3a8a;
    margin-bottom: 15px;
}

.explore-button {
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #36d1dc;
    /* Màu tím đậm */
    color: white;
    text-decoration: none;
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.explore-button:hover {
    background-color: #2bb8c2;
    /* Tím đậm hơn khi hover */
}

.explore-button i {
    margin-left: 8px;
}

/* Phần carousel */
.carousel-container {
    display: flex;
    justify-content: center;
}

.carousel {
    width: 900px;
    max-width: 900px;
    /* Giới hạn chiều rộng carousel */
}

/* Chỉ hiển thị item active */
.carousel-inner .carousel-item {
    display: none;
}

.carousel-inner .carousel-item.active {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* Chia đều thành 3 cột */
    gap: 15px;
    /* Khoảng cách giữa các ảnh */
    justify-items: center;
    /* Căn giữa ảnh trong mỗi cột */
    padding: 15px;
}

/* Định dạng ảnh */
.carousel-image {
    width: 250px;
    height: 250px;
    object-fit: cover;
    /* Giữ tỷ lệ, cắt phần thừa */
    border-radius: 5px;
    /* Bo góc nhẹ */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* Thêm bóng nhẹ */
}
</style>
