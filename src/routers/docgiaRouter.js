import DocGiaView from '../views/DocGia/DocGiaView.vue';
import ThemDGView from '../views/DocGia/ThemDGView.vue';
import SuaDGView from '../views/DocGia/SuaDGView.vue';

export default [
    {
        path: '/docgia',
        name: 'DocGiaView',
        component: DocGiaView,
    },
    {
        path: '/docgia/them',
        name: 'ThemDGView',
        component: ThemDGView,
    },
    {
        path: '/docgia/:MaDG',
        name: 'SuaDGView',
        component: SuaDGView,
        props: true,
    }
];