<template>
  <div :class="$style.main">
    <template v-show="$route.name === 'detailView'">
      <div :class="$style.detail" ref="detail" :style="style">
        <MerchantView v-if="data && view === 'merchant'" :data="data"></MerchantView>
        <PostView v-if="data && view === 'post'" :data="data"></PostView>
        <ProductView v-if="data && view === 'item'" :data="data"></ProductView>
      </div>
      <div :class="$style.bottom" v-if="data">
        <Btn type="blue" :title="`${disabled ? '已':''}收藏`" @clickBtn="clickBtn"></Btn>
      </div>
    </template>
    <router-view :data="data" mode="in-out"></router-view>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import MerchantView from './merchantView.vue'
import PostView from './postView.vue'
import ProductView from './productView.vue'
import Btn from '~src/components/Btn.vue'
import routerReplace from '~src/tool/routerReplace'

export default {
  name: 'detail',
  data () {
    return {
      style: {
        height: window.innerHeight + 'px'
      },
      view: '',
      data: null,
      disabled: false
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (String(to.params.id) !== String(from.params.id)) {
      this.$store.dispatch(Types.OPEN_LOADING)
      this.view = null
      this.$refs.detail.scrollTop = 0
      this.fetchData({ type: to.params.type, id: to.params.id })
    }
    next()
  },
  components: { MerchantView, PostView, ProductView, Btn },
  created () {
    const toRoute = JSON.stringify({ name: this.$route.name, params: this.$route.params })
    // 不验证用户信息，测试用
    if (this.$route.name === 'detailTestView') {
      this.fetchData({ type: this.$route.params.type, id: this.$route.params.id })
      return
    }
    //
    this.$store.dispatch(Types.USER_LOGIN, {}).then(user => {
      if (!user.is_cellphone_checked) {
        routerReplace(this, { name: 'registerPhoneView', query: { toRoute: toRoute }})
        return
      } else if (!user.is_company_checked) {
        routerReplace(this, { name: 'coummateInfoView', query: { toRoute: toRoute }})
        return
      }
      this.fetchData({ type: this.$route.params.type, id: this.$route.params.id })
    })
  },
  methods: {
    clickBtn () {
      if (this.disabled === true) {
        this.$store.dispatch(Types.UPDATE_USERS_COLLECTS_DEL, {
          type: this.view,
          id: this.$route.params.id
        }).then(() => {
          this.disabled = false
        })
      } else {
        this.$store.dispatch(Types.UPDATE_USERS_COLLECTS_POST, {
          type: this.view,
          id: this.$route.params.id
        }).then(() => {
          this.disabled = true
          this.$store.dispatch(Types.OPEN_POPUP, {
            title: '提示',
            word: '收藏成功',
            leftMsg: '确定'
          })
        })
      }
    },
    fetchData ({ type, id }) {
      this.view = type
      this.$store.dispatch(Types.UPDATE_DETAIL, { type, id }).then(data => {
        if (data.is_collected) {
          this.disabled = true
        }
        this.data = data
        if (type !== 'item') {
          this.$store.dispatch(Types.CHANGE_NAV, { title: `${data.label} Fit-map` })
        } else {
          this.$store.dispatch(Types.CHANGE_NAV, { title: `商品详情 Fit-map` })
        }
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
  background $mainBg
  min-height 100%

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
