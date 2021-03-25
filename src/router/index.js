import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store/index";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requireAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const routeProtected = to.matched.some(record => record.meta.requireAuth);

  if(routeProtected && store.state.token === '') {
    next({ name: 'Login' });
  }
  else {
    next();
  }
});

export default router
