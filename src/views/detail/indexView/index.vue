<template>
  <div :class="$style.main">
    <div :class="$style.detail" :style="style">
      <MerchantView v-if="view === 'merchant'"></MerchantView>
      <PostView v-if="view === 'post'"></PostView>
      <ProductView v-if="view === 'product'"></ProductView>
    </div>
    <div :class="$style.bottom">
      <Btn type="blue" title="收藏" @clickBtn="clickBtn"></Btn>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import MerchantView from './merchantView.vue'
import PostView from './postView.vue'
import ProductView from './productView.vue'
import Btn from '~src/components/Btn.vue'

export default {
  name: 'detail',
  data () {
    return {
      style: null,
      view: 'product'
    }
  },
  components: { MerchantView, PostView, ProductView, Btn },
  created () {
    this.style = {
      height: window.innerHeight + 'px'
    }
    this.$store.dispatch(Types.CLOSE_LOADING)
  },
  methods: {
    clickBtn () {
      this.$store.dispatch(Types.OPEN_POPUP, {
        title: '提示',
        word: '收藏成功',
        leftMsg: '确定'
      })
    }
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
