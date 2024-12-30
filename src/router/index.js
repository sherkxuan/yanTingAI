import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Writing from '../views/Writing.vue'
import Check from '../views/Check.vue'
import Rewrite from '../views/Rewrite.vue'
import Promote from '../views/Promote.vue'
import Download from '../views/Download.vue'
import News from '../views/News.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/writing',
    name: 'writing',
    component: Writing
  },
  {
    path: '/check',
    name: 'check',
    component: Check
  },
  {
    path: '/rewrite',
    name: 'rewrite',
    component: Rewrite
  },
  {
    path: '/promote',
    name: 'promote',
    component: Promote
  },
  {
    path: '/download',
    name: 'download',
    component: Download
  },
  {
    path: '/news',
    name: 'news',
    component: News
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router