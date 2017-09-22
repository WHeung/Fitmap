<template>
  <div>Fitmap</div>
</template>

<script>
export default {
  name: 'app',
  computed: {
  },
  methods: {
  },
  created () {
    // window.onpopstate = () => { // 回退情况下判断，进入过外路由回来可能会触发部落vue的路由
    //   setTimeout(() => {
    //     if ('#' + this.$route.fullPath !== window.location.hash) {
    //       window.location.reload()
    //     }
    //   }, 200)
    // }
  }
}
</script>

<style lang="stylus">
body,
html
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size 15px
  background-color #f7f7f7
  margin 0
  padding 0
  overflow-y scroll

div,p,ul,ol,li,span,a,button,input,textarea,form
  margin:0
  padding:0

button,input,textarea,form
  border 0
i
  font-style normal
ul,ol
  list-style:none

input, button, textarea, select
  font-family inherit
  font-size inherit
  font-weight inherit
  border 0
  background none
  -webkit-appearance none
  outline none

a
  text-decoration none

.dwf-wrap
  background-color #f7f7f7

.view
  position relative
  max-width 540px
  margin 0 auto

.view-enter-active, .view-leave-active
  transition all .3s ease

.view-enter
  opacity 0

.view-enter-active
.view-leave
  opacity 1
  transform scale(1)

.view-enter-active
.view-leave-active
  transition all .2s ease

.view-leave-active
.view-enter
  opacity 0.3
  transform scale(.99)

.ready
  visibility hidden

.left-enter-active
   transition: all 1s ease-out;
   transform: translateX(0)
.left-leave-active
   transition: all 1s ease-out;
   transform: translateX(-100%)
.left-enter
   transform: translateX(100%)
.left-leave
   transform: translateX(0)
.right-enter-active
   transition: all 1s ease-out;
   transform: translateX(0)
.right-leave-active
   transition: all 1s ease-out;
   transform: translateX(100%)
.right-enter
   transform: translateX(-100%)
.right-leave
   transform: translateX(0)
</style>

<style lang="stylus" module>

</style>
