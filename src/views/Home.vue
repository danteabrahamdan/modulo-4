<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    
    {{ $data }}
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      usuarioActual: {
        role: '',
        google: false,
        nombre: '',
        email: '',
        uid: ''
      }
    }
  },
  created() {
    this.usuarioActual = JSON.parse(localStorage.getItem('usuario')) || '';
  },
  methods: {
    
  }
}
</script>
