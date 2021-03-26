<template>
  <div class="limiter">
    <div
      class="container-login100 bg-auth"
    >
      <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
        <form class="login100-form" autocomplete="off" @submit.prevent="register">
          <span class="login100-form-title p-b-49">
            Registrate
          </span>

          <div class="wrap-input100 m-b-23">
            <span class="label-input100">Nombre</span>
            <input
              class="input100"
              type="text"
              name="nombre"
              placeholder="Ingrese su nombre"
              v-model.trim="usuario.nombre"
            />
            <span class="focus-input100"></span>
          </div>

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
                Registrar
              </button>
            </div>
          </div>

          <LoadingComponent v-else/>

          <div class="flex-col-c p-t-20">
            <span class="txt1 p-b-17">
              ¿Ya tienes una cuenta?
            </span>

            <router-link to="/login" class="txt2">
              Inicia sesión
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
  name: 'Register',
  components: {
    LoadingComponent
  },
  data() {
    return {
      usuario: { password: '', email: '', nombre: '' },
      loading: false
    }
  },
  methods: {
    ...mapActions(['guardarToken']),
    async register() {
      this.loading = true;
      if(this.usuario.email === '' || this.usuario.password === '' || this.usuario.nombre === '') {
        this.loading = false;
        return
      }
      await this.axios.post('/api/usuarios', this.usuario)
        .then(res => {
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
        })
    }
  }
}
</script>

<style lang="scss">
@import "../styles/auth.scss";

.bg-auth {
  background-image: url('../assets/images/bg-01.jpg');
}
</style>
