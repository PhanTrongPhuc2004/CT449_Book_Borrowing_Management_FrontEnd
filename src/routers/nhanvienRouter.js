import NhanVienView from '../views/NhanVien/NhanVienView.vue';
import ThemNVView from '../views/NhanVien/ThemNVView.vue';
import SuaNVView from '../views/NhanVien/SuaNVView.vue';

export default [
    {
        path: '/nhanvien',
        name: 'NhanVienView',
        component: NhanVienView,
    },
    {
        path: '/nhanvien/them',
        name: 'ThemNVView',
        component: ThemNVView,
    },
    {
        path: '/nhanvien/:MaNV',
        name: 'SuaNVView',
        component: SuaNVView,
        props: true,
    }
];