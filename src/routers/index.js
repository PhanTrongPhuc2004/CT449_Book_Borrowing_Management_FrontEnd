import { createRouter, createWebHistory } from 'vue-router';

// routes
import trangChuRoutes from "./trangchuRouter.js";
import xacThucRoutes from "./xacthucRouter.js";
import taiKhoanRoutes from "./taikhoanRouter.js";
import sachRoutes from "./sachRouter.js";
import quanLyRoutes from "./quanLyRouter.js";
import docGiaRoutes from "./docgiaRouter.js";
import nhanVienRoutes from "./nhanvienRouter.js";
import danhMucRoutes from "./danhmucRouter.js";
import nhaxuatBanRoutes from './nhaxuatbanRouter.js';
import muonTraRoutes from './muonTraRouter.js';
import NotFound from '../views/NotFound/NotFoundView.vue';

// create router
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...trangChuRoutes,
        ...xacThucRoutes,
        ...taiKhoanRoutes,
        ...sachRoutes,
        ...docGiaRoutes,
        ...nhanVienRoutes,
        ...danhMucRoutes,
        ...nhaxuatBanRoutes,
        ...muonTraRoutes,
        ...quanLyRoutes,
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFound,
        },
    ],
});

export default router;