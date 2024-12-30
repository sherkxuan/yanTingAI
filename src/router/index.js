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
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/writing',
    name: 'writing',
    component: Writing,
    meta: { title: '论文写作' }
  },
  {
    path: '/check',
    name: 'check',
    component: Check,
    meta: { title: '论文查重' }
  },
  {
    path: '/rewrite',
    name: 'rewrite',
    component: Rewrite,
    meta: { title: '降重复写' }
  },
  {
    path: '/promote',
    name: 'promote',
    component: Promote,
    meta: { title: '推广赚钱' }
  },
  {
    path: '/download',
    name: 'download',
    component: Download,
    meta: { title: '报告下载' }
  },
  {
    path: '/news',
    name: 'news',
    component: News,
    meta: { title: '行业资讯' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.afterEach((to) => {
  // 设置标题，使用路由 meta 中的 title
  document.title = to.meta.title || '默认标题';
});
export default router