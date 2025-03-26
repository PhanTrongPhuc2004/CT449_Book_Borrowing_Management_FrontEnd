import SachView from "../views/Sach/SachView.vue";
import ChiTietSachView from '../views/Sach/ChiTietSachView.vue';
import ThemSachView from '../views/Sach/ThemSachView.vue';
import SuaSachView from '../views/Sach/SuaSachView.vue';

export default [
    {
        path: '/sach',
        name: 'SachView',
        component: SachView,
    },
    {
        path: '/sach/:id',
        name: 'ChiTietSachView',
        component: ChiTietSachView,
        props: true,
    },
    {
        path: '/sach/them',
        name: 'ThemSachView',
        component: ThemSachView,
    },
    {
        path: '/sach/:id',
        name: 'SuaSachView',
        component: SuaSachView,
        props: true,
    }
];