import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from "../views/NotFound.vue"
import Dashboard from "../views/usuario/Dashboard.vue"
import Profile from "../views/usuario/Profile.vue"
import EditProfile from "../views/usuario/EditProfile.vue"
import Hospitales from "../views/categorias/Hospitales.vue"
import Medicos from "../views/categorias/Medicos.vue"
import Usuarios from "../views/categorias/Usuarios.vue"
import store from "../store/index"


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requireAuth: true },
    children: [
      { path: '/', name: 'Dashboard', component: Dashboard },
      { path: '/profile', name: 'Profile', component: Profile },
      { path: '/editprofile', name: 'EditProfile', component: EditProfile },
      { path: '/hospitales', name: 'Hospitales', component: Hospitales },
      { path: '/medicos', name: 'Medicos', component: Medicos },
      { path: '/usuarios', name: 'Usuarios', component: Usuarios },
    ]
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
  },
  // Redirecciones
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/dashboard',
    redirect: '/'
  },
  // 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
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
