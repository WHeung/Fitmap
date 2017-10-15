<template>
  <div :class="$style.main">
    <div :class="$style.detail" ref="detail" :style="style">
      <MerchantView v-if="data && view === 'merchant'" :data="data"></MerchantView>
      <PostView v-if="data && view === 'post'" :data="data"></PostView>
      <ProductView v-if="data && view === 'product'" :data="data"></ProductView>
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
      view: '',
      data: null
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch(Types.OPEN_LOADING)
    this.view = null
    this.$refs.detail.scrollTop = 0
    this.fetchData({ type: to.params.type, id: to.params.id })
    next()
  },
  components: { MerchantView, PostView, ProductView, Btn },
  created () {
    this.style = {
      height: window.innerHeight + 'px'
    }
    this.fetchData({ type: this.$route.params.type, id: this.$route.params.id })
  },
  methods: {
    clickBtn () {
      this.$store.dispatch(Types.OPEN_POPUP, {
        title: '提示',
        word: '收藏成功',
        leftMsg: '确定'
      })
    },
    fetchData ({ type, id }) {
      this.view = type
      this.$store.dispatch(Types.UPDATE_DETAIL, { type, id }).then(data => {
        this.data = data
        this.$store.dispatch(Types.CLOSE_LOADING)
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
