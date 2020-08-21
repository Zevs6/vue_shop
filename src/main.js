import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
// 导入全局样式表
import './assets/css/global.css';

import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
// 添加axios请求拦截器
axios.interceptors.request.use(config => {
    // 从sessionStorage中获取token为Authorization字段添加请求头对象
    config.headers.Authorization = window.sessionStorage.getItem('token') || '';
    // 在最后必须return config
    return config
})
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");