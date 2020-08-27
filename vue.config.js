module.exports = {
    publicPath: './', //输出的根路径  默认是/ 如果你的网站是app.com/vue 这更改此配置项
    devServer: { // 环境配置
        host: 'localhost',
        port: 8080, //端口
        https: false, // 是否启用https
        hotOnly: false,
        open: true, //配置自动启动浏览器
        proxy: { // 配置多个代理
            '/api': {
                target: 'https://3g.163.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
    pluginOptions: { // 第三方插件配置
        // ...
    },
    chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config
                .entry('app')
                .clear()
                .add('./src/main-prod.js')

            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                lodash: '_',
                echarts: 'echarts',
                nprogress: 'NProgress',
                'vue-quill-editor': 'VueQuillEditor'
            })

            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })

        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config
                .entry('app')
                .clear()
                .add('./src/main-dev.js')

            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }


};