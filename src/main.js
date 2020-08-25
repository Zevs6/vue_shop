import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
// 导入全局样式表
import './assets/css/global.css';

// 导入树形结构表格插件
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)

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

// 导入 vue-quill-editor 编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */ )

Vue.filter('dataFormat', function(option) {
    const dt = new Date(option)
    const y = dt.getFullYear();
    const m = (dt.getMonth() + 1 + '').padStart(2, '0');
    const d = (dt.getDate() + '').padStart(2, '0');
    const hh = (dt.getHours() + '').padStart(2, '0');
    const mm = (dt.getMinutes() + '').padStart(2, '0');
    const ss = (dt.getSeconds() + '').padStart(2, '0');
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");