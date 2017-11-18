import Vue from 'vue';
import Layout from './components/layout';
import VueRouter from 'vue-router';
//import iView from "iview";
import App from './App';
// import VueResource from 'vue-resource'
import IndexPage from './pages/index';

import { Button, Table } from "iview";
Vue.component("Button", Button);
Vue.component("Table", Table);

// import DetailPage from './pages/detail'
// import OrderListPage from './pages/orderList'
// import DetailAnaPage from './pages/detail/analysis'
// import DetailCouPage from './pages/detail/count'
// import DetailForPage from './pages/detail/forecast'
// import DetailPubPage from './pages/detail/publish'

import './common/style/base.scss';
Vue.use(VueRouter);
//Vue.use(iView);
// Vue.use(VueResource)
let router = new VueRouter({
        //mode: 'history',
        routes: [{
            path: '/',
            redirect: '/index'
        }, {
            path: '/index',
            component: IndexPage
        }]
    })
    /* eslint-disable no-new */
    // new Vue({
    //     el: '#app',
    //     router,
    //     // template: '<Layout/>',
    //     // components: { Layout }
    //     render: h => h(App)
    // })

const app = new Vue({
    router,
    render: h => h(App)
}).$mount("#app");