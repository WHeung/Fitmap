import Vue from 'vue'
Vue.directive('pxtorem', {
  bind: function (el, binding, vnode) {
    let width = window.innerWidth
    if (width > 500) {
      width = 500
    }
    window.document.documentElement.style.fontSize = (width / 375) * 20 + 'px'
  },
  unbind: function (el, binding, vnode) {
    // window.document.documentElement.style.fontSize = '15px'
  }
})
