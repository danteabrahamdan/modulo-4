<template>
  <div class="limiter">
    <div
      class="container-login100 bg-auth"
    >
      <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
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

          <div class="container-login100-form-btn">
            <div class="wrap-login100-form-btn">
              <div class="login100-form-bgbtn"></div>
              <button class="login100-form-btn" type="submit">
                Iniciar sesión
              </button>
            </div>
          </div>

          <div class="flex-col-c p-t-60">
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

export default {
  data() {
    return {
      usuario: { email: '', password: '' }
    }
  },
  methods: {
    ...mapActions(['guardarToken']),
    async login() {
      if(this.usuario.email === '' || this.usuario.password === '') {
        return
      }
      await this.axios.post('/api/login', this.usuario)
        .then(res => {
          //localStorage.setItem('token', res.data.token);
          console.log(res.data);
          const token = res.data.token;
          this.guardarToken(token);
        })
        .catch(err => {
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
