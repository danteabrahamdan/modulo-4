import { createStore } from 'vuex'
import router from "../router/index";
import axios from 'axios';

export default createStore({
  state() {
    return {
      token: '',
      usuarioActual: {}
    }
  },
  mutations: {
    async verificarToken(state, token) {
      state.token = token;

      if(token === '') {
        state.idUsuarioActual = '';
      }
      else {
        // TODO: Decode id de token
        await axios.get('api/login/renew', { headers: { "x-token": state.token } })
          .then(res => {
            state.usuarioActual = res.data.usuario;
            state.token = res.data.token;
            localStorage.setItem('token', state.token);
          })
          .catch(e => console.log(e.response.data.msg));
        //router.push({ name: 'Dashboard' });
      }
    }
  },
  actions: {
    guardarToken({commit}, token) {
      localStorage.setItem('token', token);
      commit('verificarToken', token);
    },
    cerrarSesion({commit}) {
      commit('verificarToken', '');
      localStorage.removeItem('token');
      router.push({ name: 'Login' });
    },
    leerToken({commit}) {
      const token = localStorage.getItem('token') || null;
      if(token) {
        commit('verificarToken', token);
      }
      else {
        commit('verificarToken', '');
      }
    }
  },
  modules: {
  }
})
