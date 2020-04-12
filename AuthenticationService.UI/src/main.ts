import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import storePlugin from './storePlugin'
import router from './router/router'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false;
Vue.use(storePlugin)
Vue.use(VueRouter)

const vue = new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App)
})

