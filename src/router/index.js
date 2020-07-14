import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import A from '../views/a.vue'
import B from '../views/b.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/a',
    children: [
      { path: 'a', component: A },
      
      { path: 'b', component: B }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
