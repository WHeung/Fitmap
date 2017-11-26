<template>
  <div>
    <div id="allmap" :style="mapStyle"></div>
    <div id="app" v-pxtorem>
      <transition :name="isIOSDevice?'view':''" mode="out-in">
        <router-view :class="[{ready: loading}, 'routeView']"></router-view>
      </transition>
      <Toast></Toast>
      <Loading></Loading>
      <ApiLoading></ApiLoading>
      <popUp></popUp>
    </div>
  </div>
</template>

<script>
import * as Types from './store/types'
import Toast from './components/Toast.vue'
import Loading from './components/loading.vue'
import ApiLoading from './components/ApiLoading.vue'
import popUp from './components/popUp.vue'
import { isWeixin } from '~src/tool/containerDetect'
import { isIOS } from '~src/tool/containerDetect'

export default {
  name: 'app',
  components: { Toast, Loading, ApiLoading, popUp },
  data () {
    return {
      mapStyle: {
        width: window.innerWidth + 'px',
        height: window.innerHeight + 'px'
      }
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    isIOSDevice () {
      return isIOS()
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style lang="stylus">
body,
html
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size 14px
  background-color #F5F7FA
  color #474C54
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

.trans
  position relative
.trans-enter-active
  transition all .3s ease
.trans-enter
  transform translateY(100%)
.trans-enter-to
  transform translateY(0%)

.ready
  visibility hidden

#app
  pointer-events none
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  div
    pointer-events visible

.routeView
  width 100%
  min-height 100%

  

.amap-logo
.amap-copyright
.anchorBL
  display none !important

.amap-geo
  display block !important
// #app .amap-zoomcontrol
//   position fixed
//   right 10px
//   bottom 10px

#allmap
  width 100%
  height 100%
  transform translateZ(0)
  opacity 1
  -webkit-overflow-scrolling touch

</style>
