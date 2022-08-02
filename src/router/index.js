import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 当转换成路径时候再去请求页面，懒加载页面
// 优化首屏加载速度
const routes = [
  {
    path: '/login',
    component: () => import('../views/login')
  },
  {
    // 如果子路由的path没有/那么会把父亲path和儿子的path拼接起来
    // 如果子路由的path有/那么不会拼接
    path: '/',
    component: () => import('../views/layout'),
    redirect: '/ ',
    children: [
      { path: '/ ', component: () => import('../views/Home/index.vue') },
      { path: '/video', component: () => import('../views/video/index.vue') },
      { path: '/qa', component: () => import('../views/QA/index.vue') },
      { path: '/my', component: () => import('../views/My/index.vue') },
      {
        path: '/my/profile',
        component: () => import('../views/user-profile/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
