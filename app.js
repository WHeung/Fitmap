import Vue from 'vue'
import App from './src/App.vue'
import store from './src/store'
import router from './src/router'
import 'es6-promise/auto'
import 'object-assign-shim'
import Lazyload from 'vue-lazyload'
import './src/directives/iScroll'
import './src/directives/pxToRem'

Vue.use(Lazyload)

const app = new Vue({
  router,
  store,
  ...App
})

app.$mount('#app')
