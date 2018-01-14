import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Video from '@/components/video'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/video',
      name: 'videoPlayer',
      component: Video
    }
  ]
})
