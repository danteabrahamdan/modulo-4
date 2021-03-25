import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from "vue-axios";
import axios from "axios";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


axios.defaults.baseURL = 'https://adminpro-node.herokuapp.com';
createApp(App).use(store).use(router).use(VueAxios, axios).use(VueSweetalert2).mount('#app')
