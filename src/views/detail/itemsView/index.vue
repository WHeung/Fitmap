<template>
  <div :class="$style.main">
    <Item :class="$style.item"
      v-for="data in dataList" :key="data.id"
      :data="data" @toDetail="toDetail"></Item>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import Item from './components/storeItem.vue'

export default {
  name: 'items-View',
  components: { Item },
  data () {
    return {
      type: '',
      dataList: []
    }
  },
  created () {
    this.$store.dispatch(Types.OPEN_LOADING)
    this.$store.dispatch(Types.CHANGE_NAV, { title: `商品列表 Fit-map` })
  },
  methods: {
    toDetail (id) {
      this.$router.push({ name: 'detailView', params: { type: 'item', id: parseInt(id) }})
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.main
  background $mainBg
.item
  margin-bottom 12px

.img
  padding-top 120px
  margin 0 auto
  width (218/20)rem
  height (88/20)rem
  background url('~src/public/fm_empty_fav.svg') no-repeat
  background-size 100% 100%

.title
  margin 12px auto 0
  font-size 14px
  color #9DA2AB
  text-align center
  line-height 24px

.btn
  margin-top 36px
  text-align center
  button
    margin 0 auto
    border 1px solid #474C54
    border-radius 18px
    padding 8px 30px


</style>

