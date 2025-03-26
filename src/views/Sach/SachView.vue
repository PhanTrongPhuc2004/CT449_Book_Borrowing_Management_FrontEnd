<template>
    <div class="navbar-container mb-3 mt-8">
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid justify-content-end">
                <h1 class="me-auto text-head fs-1 fw-bold" style="text-align: center !important; color: #1e3a8a;" >DANH MỤC SÁCH</h1>
                <router-link v-if="user?.role === 'nhanvien' || user?.role === 'employee'" :to="{ name: 'ThemSachView' }"
                    class="btn btn-create me-3 fs-6 fw-bold rounded-3">
                    <i class="fa-solid fa-plus"></i>
                    Thêm Sách
                </router-link>
                <form class="d-flex" @submit.prevent="handleSearch">
                    <input class="form-control me-2" type="search" placeholder="Tìm kiếm sách" aria-label="Search"
                        v-model="textSearch">
                    <button class="btn btn-search" type="submit">Tìm</button>
                </form>
            </div>
        </nav>
    </div>
    <!-- {{ user}} -->
    <div class="row justify-content-center">
        <BookCard class="col-md-4 book-card" v-for="book in books.value" :book="book" :key="book._id" />
    </div>
</template>

  <script>
import { ref, onMounted } from 'vue';
import BookCard from '/src/components/BookCard.vue';
import { getAllBooks } from '/src/services/sachApiService.js';
import { useAuthStore } from '/src/stores/xacThucStore.js';

export default {
    name: 'SachView',
    setup() {
        const textSearch = ref('');
        const authStore = useAuthStore();
        const allBooks = ref([]);
        const books = ref([]);
        const user = ref({});

        user.value = authStore.userData;

        onMounted(async () => {
            try{
                const response = await getAllBooks();
                console.log(response);
                allBooks.value = response.data; // Lấy mảng sách từ response.data
                books.value = allBooks;
            } catch (error) {
                console.error( error);
            }
        });

        const handleSearch = () => {
            books.value = allBooks.value.filter(book =>
                book.TenSach.toLowerCase().includes(textSearch.value.toLowerCase())
            );
        };

        return {
            books,
            user,
            textSearch,
            handleSearch,
        
        };
    },
    components: {
        BookCard,
    },
}
</script>
<style scoped>
h1 {
    color: #4921f3;
    cursor: pointer;  
    font-size: 2rem;
}

.btn-create {
    background: #36d1dc;
    color: white;
}

.btn-create:hover {
    background: #5b86e5;
    color: white;
}

.btn-search {
    background-color: #36d1dc ;
    color: white;
    font-weight: bold;
}

.btn-search:hover {
    background-color: #5b86e5 ;
    color: white;
}

.row {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
}

.book-card {
    margin: 0px;
}

.navbar {
    margin: auto;
    width: 1250px;
    background-color: #f8f9fa !important;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>