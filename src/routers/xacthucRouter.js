import DangNhap from "../views/XacThuc/DangNhap.vue";
import DangKy from "../views/XacThuc/DangKy.vue";

export default [
    {
        path: '/dangnhap',
        name: 'DangNhap',
        component: DangNhap,
    },
    {
        path: '/dangky',
        name: 'DangKy',
        component: DangKy,
    }
];