import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TaskListPage from '../views/TaskListPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: TaskListPage
  }
]

const router = new VueRouter({
  routes
})

export default router
