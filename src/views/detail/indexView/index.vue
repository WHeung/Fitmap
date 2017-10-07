<template>
  <div :class="$style.main">
    <div :class="$style.detail" :style="style">
      <GymView v-if="view === 'gym'"></GymView>
      <PostView v-if="view === 'post'"></PostView>
    </div>
    <div :class="$style.bottom">
      <Btn type="blue" title="收藏"></Btn>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import GymView from './gymView.vue'
import PostView from './postView.vue'
import Btn from '~src/components/Btn.vue'

export default {
  name: 'detail',
  data () {
    return {
      style: null,
      view: 'gym'
    }
  },
  components: { GymView, PostView, Btn },
  created() {
    this.style = {
      height: window.innerHeight + 'px'
    }
    this.$store.dispatch(Types.CLOSE_LOADING)
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.main
  position relative

.detail
  padding-bottom 72px
  box-sizing border-box
  overflow-y scroll

.bottom
  position absolute
  bottom 0
  width 100%
  padding-bottom 12px
</style>
