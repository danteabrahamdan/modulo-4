<template>
  <div class="container-fluid">
    <div class="text-center">
      <div class="error mx-auto" data-text="404">404</div>
      <p class="lead text-gray-800 mb-5">Pagina no encontrada</p>
      <p class="text-gray-500 mb-0">Este recurso no existe en la pagina web</p>
      <a class="pointer" @click="back">&larr; Volver atras</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss">
.pointer {
  cursor:pointer;
}
</style>