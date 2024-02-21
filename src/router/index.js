import { getAppkey } from '@/utils/user'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: 'count',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: 'count',
        name: 'Count',
        component: () => import('@/views/home/count.vue')
      }

    ]

  },
  {
    path: '/prod',
    name: 'Layout',
    redirect: 'prodmanage',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: 'manage',
        name: 'Prodmanage',
        component: () => import('@/views/product/prodmanage.vue')
      },
      {
        path: 'add',
        name: 'Prodadd',
        component: () => import('@/views/product/prodadd.vue')
      }
    ]

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')

  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]
// 将VueRouter原型上的push和replace保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 修改VueRouter原型上的push，用于解决重复跳转报错
VueRouter.prototype.push = function (location, okCallback, errCallback) {
  if (okCallback || errCallback) {
    return originPush.call(this, location, okCallback, errCallback)
  } else {
    return originPush.call(this, location).catch(() => {})
  }
}
// 修改VueRouter原型上的replace，用于解决重复跳转报错
VueRouter.prototype.replace = function (location, okCallback, errCallback) {
  if (okCallback || errCallback) {
    return originReplace.call(this, location, okCallback, errCallback)
  } else {
    return originReplace.call(this, location).catch(() => {})
  }
}

const router = new VueRouter({
  routes
})
// 路由前置守卫，鉴权
// 白名单
const whiteRoutes = ['/login']
router.beforeEach((to, from, next) => {
  // 检查用户是否已登录
  const isAuthenticated = getAppkey() // 假设你的用户登录状态存储在 auth 模块中的 isAuthenticated getter 中
  if (!whiteRoutes.includes(to.path)) {
    // 如果路由需要认证，但用户未登录，则重定向到登录页面
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将当前页面的路径作为查询参数传递给登录页面，以便用户登录后可以返回当前页面
      })
    } else {
      next() // 用户已登录，继续导航
    }
  } else {
    next() // 路由不需要认证，直接继续导航
  }
})
export default router
