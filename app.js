import Vue from 'vue'
import App from './src/App.vue'
// import store from './store'
// import router from './router'
import 'object-assign-shim'

const app = new Vue({
  // router,
  // store,
  ...App
})

app.$mount('#app')
