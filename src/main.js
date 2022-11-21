const { createApp } = require('vue');
import App from "./App.vue";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import $ from 'jquery';
import Modal from "vue-bs-modal";
import toastr from 'toastr';
// import Toaster from 'v-toaster'
// import Toaster from "@meforma/vue-toaster";
// import Toast, { TYPE, PluginOptions } from "vue-toastification"
// import 'vue-toastification/dist/index.css';
// import './index.css';
//import { Modal } from 'usemodal-vue3';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faList} from '@fortawesome/free-solid-svg-icons'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'
library.add(faPenToSquare);
library.add(faBan);
library.add(faList);
library.add(faPlus);
const app = createApp(App);
//app.use(Toasted);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");
