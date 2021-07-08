<template>
  <div class="limiter">
    <div class="container-login100 bg-auth">
      <div class="wrap-login100 p-l-55 p-r-55 p-t-40 p-b-40 animate__animated animate__fadeIn">
        <form class="login100-form" autocomplete="off" @submit.prevent="register">
          <span class="login100-form-title p-b-49 size12">
            Registrate
          </span>

          <div class="wrap-input100 m-b-23">
            <span class="label-input100 size8">Nombre</span>
            <input
              class="input100 size8"
              type="text"
              name="nombre"
              placeholder="Ingrese su nombre"
              v-model="usuario.nombre"/>
            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100 m-b-23">
            <span class="label-input100 size8">Email</span>
            <input
              class="input100 size8"
              type="email"
              name="email"
              placeholder="Ingrese su email"
              v-model="usuario.email"/>
            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100">
            <span class="label-input100 size8">Contraseña</span>
            <input
              class="input100 size8"
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              v-model="usuario.password"/>
            <span class="focus-input100"></span>
          </div>

          <div class="text-right p-t-8 p-b-31"></div>

          <div class="container-login100-form-btn" v-if="loading === false">
            <div class="wrap-login100-form-btn">
              <div class="login100-form-bgbtn"></div>
              <button class="login100-form-btn size8" type="submit">
                Registrar
              </button>
            </div>
          </div>

          <LoadingComponent v-else/>

          <div class="flex-col-c p-t-20">
            <span class="txt1 p-b-17 size8">
              ¿Ya tienes una cuenta?
            </span>

            <router-link :to="{name: 'Login'}" class="txt2 size8">
              Inicia sesión
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingComponent from '@/components/LoadingComponent.vue'


export default {
  name: 'Register',
  components: {
    LoadingComponent
  },
  data() {
    return {
      usuario: { nombre: '', password: '', email: '' },
      loading: false
    }
  },
  methods: {
    async register() {
      this.loading = true;
      if(this.usuario.nombre === '' || this.usuario.email === '' || this.usuario.password === '') {
        this.loading = false;
        return
      }
      await this.axios.post('/api/usuarios', this.usuario)
        .then(res => {
          this.$router.push({ name: 'Home' });
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$swal({
            icon: 'error',
            title: 'Error',
            text: err.response.data.msg
          });
        });
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/auth.scss";

.bg-auth {
    background-image: url('../../assets/images/bg-01.jpg');
}

.size8 {
    font-size: 0.8em;
}

.size12 {
    font-size: 1.2em;
}
</style>