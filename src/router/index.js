import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/container'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/folder/0'
    },
    {
      path: '/:type/:id?',
      name: 'Container',
      component: Container
    }
  ]
})
