import MuonTraView from "../views/MuonTra/MuonTraView.vue";
import SachMuonView from "../views/MuonTra/SachMuonView.vue";

export default [
    {
        path: '/muontra',
        name: 'MuonTraView',
        component: MuonTraView,
    },
    {
        path: '/sachmuon',
        name: 'SachMuonView',
        component: SachMuonView,
        props: true,
    }
];