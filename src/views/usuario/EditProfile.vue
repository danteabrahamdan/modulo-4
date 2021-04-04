<template>
  <!-- Page Heading -->
  <div class="d-sm-flex align-items-center justify-content-between animate__animated animate__fadeIn">
    <h1 class="h5 mb-0 text-gray-800">Editar perfil</h1>
    <a class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
      <i class="fas fa-sign-out-alt fa-sm text-white-50"></i> Cerrar sesion
    </a>
  </div>

  <div class="card o-hidden border-0 shadow-lg my-3">
    <div class="card-body p-0 animate__animated animate__fadeIn">
      <!-- Nested Row within Card Body -->
      <div class="row">
        <div class="col-lg-6 d-none d-lg-block" v-if="!imgUrl">
          <img :src="getImgUser" alt="img" class="img-prof">
        </div>
        <div class="col-lg-6 d-none d-lg-block" v-else>
          <img :src="imgUrl" alt="img" class="img-prof">
        </div>
        <div class="col-lg-6">
          <div class="p-5">
            <div class="text-center">
              <h1 class="h6 text-gray-900 mb-4">Información del usuario</h1>
            </div>
            <form class="user">
              <div class="form-group">
                <input type="text" class="form-control size8" id="exampleInputEmail" placeholder="Nombre de usuario" required v-model="usuarioActual.nombre"/>
              </div>
              <div class="form-group">
                <input type="email" class="form-control size8" placeholder="Correo electronico" required v-model="usuarioActual.email"/>
              </div>

              <div class="form-group">
                <select class="form-control size8" v-model="usuarioActual.role">
                  <option value="ADMIN_ROLE">Usuario administrador</option>
                  <option value="USER_ROLE">Usuario estandar</option>
                </select>
              </div>

              <div class="form-group">
                <input type="file" id="file" class="form-control size8" ref="file" accept="image/*" v-on:change="cambiarFoto()"/>
              </div>
              
              <a class="btn btn-primary btn-user btn-block" @click="actualizarDatos()">
                Actualixar datos
              </a>
            </form>

            <hr />

            <div class="text-center">
              <a class="small" style="text-decoration: none;">Los cambios en tus datos personales, no pueden revertirse</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
      file: null,
      imgUrl: null
    }
  },
  computed: {
    ...mapState(['usuarioActual', 'token']),
    getImgUser() {
      if(!this.usuarioActual.img) {
        return 'https://res.cloudinary.com/dev-da/image/upload/v1616852812/restapinode/no-img_dimlxd.png';
      }
      else {
        return this.usuarioActual.img;
      }
    }
  },
  methods: {
    cambiarFoto() {
      this.file = this.$refs.file.files[0];
      const filename = this.file.name;
      const extension = filename.split('.')[1];
      const validFormtars = ['jpg', 'jpeg', 'png', 'gif', 'webg'];

      if(!validFormtars.includes(extension)) {
        this.$swal({ icon: 'warning', title: 'Formato no valido', text: 'Debes seleccionar una imagen' });
        this.imgUrl = null;
        this.file = null;
        return
      }

      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imgUrl = fileReader.result;
      });
      fileReader.readAsDataURL(this.file);
    },
    actualizarDatos() {
      if(this.file) {
        let formData = new FormData();
        formData.append('imagen', this.file);
        this.axios.put(`/api/upload/usuarios/${this.usuarioActual.uid}`, formData, { headers: {'x-token': this.token, 'Content-Type': 'multipart/form-data'} })
          .then(res => this.usuarioActual.img = res.data.secure_url)
          .catch(err => this.$swal({ icon: 'error', title: 'Error al actualizar', text: err.response.data.msg }))
      }

      if(this.usuarioActual.nombre !== '' && this.usuarioActual.email !== '') {
        this.axios.put(`/api/usuarios/${this.usuarioActual.uid}`, this.usuarioActual, { headers: {'x-token': this.token} })
          .then(res => this.$swal({ icon: 'success', title: 'Datos actualizados correctamente' }))
          .catch(err => this.$swal({ icon: 'error', title: 'Error al actualizar', text: err.response.data.msg }))
      }
    }
  }
}
</script>

<style scoped lang="scss">
.center-v {
  display: flex;
  align-self: center;
}

.img-prof {
  width: 300px; height: auto; border-radius: 50%; margin-top: 20px;
}

.size8 {
  font-size: 0.8em;
}
</style>