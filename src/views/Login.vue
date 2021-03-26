<template>
  <div class="limiter">
    <div
      class="container-login100 bg-auth"
    >
      <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54 animate__animated animate__fadeIn">
        <form class="login100-form" autocomplete="off" @submit.prevent="login">
          <span class="login100-form-title p-b-49">
            Inicia sesión
          </span>

          <div class="wrap-input100 m-b-23">
            <span class="label-input100">Email</span>
            <input
              class="input100"
              type="email"
              name="email"
              placeholder="Ingrese su email"
              v-model.trim="usuario.email"
            />
            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100">
            <span class="label-input100">Contraseña</span>
            <input
              class="input100"
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              v-model.trim="usuario.password"
            />
            <span class="focus-input100"></span>
          </div>

          <div class="text-right p-t-8 p-b-31"></div>

          <div class="container-login100-form-btn" v-if="loading === false">
            <div class="wrap-login100-form-btn">
              <div class="login100-form-bgbtn"></div>
              <button class="login100-form-btn" type="submit">
                Iniciar sesión
              </button>
            </div>
          </div>

          <LoadingComponent v-else/>

          <div class="flex-col-c p-t-20">
            <span class="txt1 p-b-17">
              ¿No tienes cuenta?
            </span>

            <router-link :to="{name: 'Register'}" class="txt2">
              Crear una aquí
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from "vuex";
import LoadingComponent from '@/components/LoadingComponent.vue'

export default {
  name: 'Login',
  components: {
    LoadingComponent
  },
  data() {
    return {
      usuario: { email: '', password: '' },
      loading: false
    }
  },
  methods: {
    ...mapActions(['guardarToken']),
    async login() {
      this.loading = true;
      if(this.usuario.email === '' || this.usuario.password === '') {
        this.loading = false;
        return
      }
      await this.axios.post('/api/login', this.usuario)
        .then(res => {
          //localStorage.setItem('token', res.data.token);
          const token = res.data.token;
          this.guardarToken(token);
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$swal({
            icon: 'error',
            title: 'Error',
            text: err.response.data.msg
          });
          //console.log(err.response.data);
        })
    }
  },
}
</script>

<style lang="scss">
@import "../styles/auth.scss";

.bg-auth {
  background-image: url('../assets/images/bg-01.jpg');
}
</style>
