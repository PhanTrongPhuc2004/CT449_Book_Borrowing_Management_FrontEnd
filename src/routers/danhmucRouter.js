import DanhMucView from "../views/DanhMuc/DanhMucView.vue";
import ThemDMView from '../views/DanhMuc/ThemDMView.vue';
import SuaDMView from '../views/DanhMuc/SuaDMView.vue';

export default [
    {
        path: '/danhmuc',
        name: 'DanhMucView',
        component: DanhMucView,
    },
    {
        path: '/danhmuc/them',
        name: 'ThemDMView',
        component: ThemDMView,
    },
    {
        path: '/danhmuc/:MaDM',
        name: 'SuaDMView',
        component: SuaDMView,
        props: true,
    }
];