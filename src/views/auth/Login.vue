<template>  
  <div class="limiter">
      <div class="container-login100 bg-auth">
          <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
              <form class="login100-form" autocomplete="off" @submit.prevent="login">
                  
                  <span class="login100-form-title p-b-49 size12">
                      Login
                  </span>

                  <div class="wrap-input100 m-b-23">
                      <span class="label-input100 size8">Email</span>
                      <input class="input100 size8"
                            type="email" 
                            name="email" 
                            placeholder="Ingrese su email"
                            v-model.trim="usuario.email">
                      <span class="focus-input100"></span>
                  </div>

                  <div class="wrap-input100">
                      <span class="label-input100 size8">Password</span>
                      <input class="input100 size8"
                            type="password"
                            name="password" 
                            placeholder="Ingrese su contraseña"
                            v-model.trim="usuario.password">
                      <span class="focus-input100"></span>
                  </div>
                  
                  <div class="text-right p-t-8 p-b-31"></div>
                  
                  <div class="container-login100-form-btn size8" v-if="loading === false">
                      <div class="wrap-login100-form-btn">
                          <div class="login100-form-bgbtn"></div>
                          <button class="login100-form-btn size8">
                              Login
                          </button>
                      </div>
                  </div>

                  <LoadingComponent v-else/>

                  <div class="flex-col-c p-t-60">
                      <span class="txt1 p-b-17 size8">
                          ¿No tienes cuenta?
                      </span>

                      <router-link :to="{ name: 'Register' }" class="txt2 size8">
                          Crear una aquí
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
    name: 'Login',
    components: {
        LoadingComponent
    },
    data() {
        return {
            loading: false,
            usuario: { email: '', password: '' }
        }
    },
    methods: {
        async login() {
            this.loading = true;
            if(this.usuario.email === '' || this.usuario.password === '') {
                this.loading = false;
                return
            }
            await this.axios.post('/api/login', this.usuario)
                .then((res) => {
                    this.loading = false;

                    this.$router.push({ name: 'Home' });
                })
                .catch((err) => {
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