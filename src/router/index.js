import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../components/login.vue"
const Login = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../components/login.vue')
    // import Home from "../components/home.vue"
const Home = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../components/home.vue')
    // import Welcome from "../components/welcome.vue"
const Welcome = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../components/welcome.vue')


// import Users from "../components/user/users.vue"
const Users = () =>
    import ( /* webpackChunkName: "user_rights_roles" */ '../components/user/users.vue')
    // import Rights from "../components/power/rights.vue"
const Rights = () =>
    import ( /* webpackChunkName: "user_rights_roles" */ '../components/power/rights.vue')
    // import Roles from "../components/power/roles.vue"
const Roles = () =>
    import ( /* webpackChunkName: "user_rights_roles" */ '../components/power/roles.vue')


// import Categories from "../components/goods/categories.vue"
const Categories = () =>
    import ( /* webpackChunkName: "categories_params" */ '../components/goods/categories.vue')
    // import Params from "../components/goods/params.vue"
const Params = () =>
    import ( /* webpackChunkName: "categories_params" */ '../components/goods/params.vue')

// import GoodsList from "../components/goods/list.vue"
const GoodsList = () =>
    import ( /* webpackChunkName: "goods" */ '../components/goods/list.vue')
    // import AddGoods from "../components/goods/add.vue"
const AddGoods = () =>
    import ( /* webpackChunkName: "goods" */ '../components/goods/add.vue')

// import Order from "../components/order/order.vue"
const Order = () =>
    import ( /* webpackChunkName: "order" */ '../components/order/order.vue')
    // import Report from "../components/report/report.vue"
const Report = () =>
    import ( /* webpackChunkName: "order" */ '../components/report/report.vue')

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
            { path: '/users', component: Users },
            { path: '/roles', component: Roles },
            { path: '/rights', component: Rights },
            { path: '/goods', component: GoodsList },
            { path: '/goods/add', component: AddGoods },
            { path: '/params', component: Params },
            { path: '/categories', component: Categories },
            { path: '/orders', component: Order },
            { path: '/reports', component: Report }

        ]
    }
];

const router = new VueRouter({
    // mode: "history",
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