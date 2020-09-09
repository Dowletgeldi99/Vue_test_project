import Vue from "vue";
import VueRouter from 'vue-router';
import App from './views/app.vue';
import Home from './components/home.vue';
import Table from './components/table.vue';
import Canvas from './components/canvas.vue';
import {i18n} from './plugins/i18n';
import FlagIcon from 'vue-flag-icon';

Vue.use(VueRouter);
Vue.use(FlagIcon);

const routes = [
    { path: '/', name: 'home', component: Home },
    {path: '/table', name: 'table', component: Table },
    {path: '/canvas', name: 'canvas', component: Canvas }
];

const router = new VueRouter({
    routes
});


const app = new Vue({
    el : '#app',
    render: h => h(App),
    router,
    i18n
}).$mount('#app');

Vue.component('vue-component', require('./views/app.vue').default);