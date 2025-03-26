import NhaXuatBanView from "../views/NhaXuatBan/NhaXuatBanView.vue";
import ThemNXBView from '../views/NhaXuatBan/ThemNXBView.vue';
import SuaNXBView from '../views/NhaXuatBan/SuaNXBView.vue';

export default [
    {
        path: '/nhaXuatBan',
        name: 'NhaXuatBanView',
        component: NhaXuatBanView,
    },
    {
        path: '/nhaXuatBan/them',
        name: 'ThemNXBView',
        component: ThemNXBView,
    },
    {
        path: '/nhaXuatBan/:MaNXB',
        name: 'SuaNXBView',
        component: SuaNXBView,
        props: true,
    }
];