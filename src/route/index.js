import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout/index'
import pageNotFound from '@/views/404'
import Main from '@/views/layout/Main'
import Api from '@/views/sys/api'
import Resource from '@/views/sys/resource'
import Role from '@/views/sys/role'
import Dict from '@/views/sys/dict'

Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'test',
      component: Role,
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '',
          component: Main
        },
        {
          path: 'api',
          component: Api
        },
        {
          path: 'resource',
          component: Resource
        },
        {
          path: 'role',
          component: Role
        },
        {
          path: 'dict',
          component: Dict
        }
      ]
    }, {
      path: '*',
      name: 'pageNotFound',
      component: pageNotFound,
    }
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   // https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E5%BC%82%E6%AD%A5%E6%BB%9A%E5%8A%A8
  //   return savedPosition || {x: 0, y: 0}
  // }
})
