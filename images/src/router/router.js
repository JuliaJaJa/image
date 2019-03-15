import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      component: () => import('@/components/Layout'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home')
        },
        // 修改密码
        {
          path: '/personal/modifyPassword',
          name: 'modifyPassword',
          component: () => import('@/views/modifyPassword')
        },
        // 修改个人信息
        {
          path: '/personal/modifyPersonalInfo',
          name: 'modifyPersonalInfo',
          component: () => import('@/views/modifyPersonalInfo')
        },
        // 我的动态
        {
          path: '/community/myMoments',
          name: 'myMoments',
          component: () => import('@/views/myMoments')
        },
        // 所有动态
        {
          path: '/community/allMoments',
          name: 'allMoments',
          component: () => import('@/views/allMoments')
        },
        // 相册
        {
          path: '/photos/:albumId',
          name: 'photos',
          component: () => import('@/views/photos')
        }
      ]
    },
    // 登录
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login')
    },
    // 注册
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register')
    },
    
  ]
})
