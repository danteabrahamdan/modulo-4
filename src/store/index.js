import { createStore } from 'vuex'
import router from "../router/index";


export default createStore({
  state: {
    token: ''
  },
  mutations: {
    verificarToken(state, token) {
      state.token = token;
      if(token !== '') {
        //state.token = '';
        router.push({ name: 'Home' })
      }
    }
  },
  actions: {
    guardarToken({commit}, token) {
      localStorage.setItem('token', token);
      commit('verificarToken', token);
    }
  },
  modules: {
  }
})
