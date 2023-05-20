import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import TotalSalary from '../components/TotalSalary.vue'
import TablePage from '../components/TablePage.vue'
import ExpenseList from '../components/ExpenseList.vue'
import ChartPage from '../components/ChartPage.vue'
import LoginPage from '../components/LoginPage.vue'
import SignupForm from '../components/SignupForm.vue'
const routes = [
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/totalSalary',
    name: 'TotalSalary',
    component: TotalSalary
  },
  {
    path: '/tablePage',
    name: 'TablePage',
    component: TablePage
  },
  {
    path: '/expenseList',
    name: 'ExpenseList',
    component: ExpenseList
  },
  {
    path: '/chartPage',
    name: 'ChartPage',
    component: ChartPage
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/',
    name: 'SignupForm',
    component: SignupForm
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
