import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/login.vue"
import Home from "../components/home.vue"
import Welcome from "../components/welcome.vue"
import users from "../components/user/users.vue"

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' }, // 路由重定向
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        children: [
            { path: '/', redirect: '/welcome' },
            { path: '/welcome', component: Welcome },
            { path: '/users', component: users },
            { path: '/roles', component: Welcome },
            { path: '/rights', component: Welcome },
            { path: '/goods', component: Welcome },
            { path: '/params', component: Welcome },
            { path: '/categories', component: Welcome },
            { path: '/orders', component: Welcome },
            { path: '/reports', component: Welcome }

        ]
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数 表示放行
    // next() 放行  next('/login') 强制跳转
    if (to.path === '/login') return next();
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) {
        return next('/login')
    } else {
        next()
    }
});

export default router;