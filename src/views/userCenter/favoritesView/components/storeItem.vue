<template>
  <div :class="$style.main" @click="toDetail">
    <div :class="$style.img">
      <img :src="data.images[0].url">
    </div>
    <div :class="$style.content">
      <div :class="$style.title">{{data.title}}</div>
      <div :class="$style.price">{{data.price}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-favor-item',
  props: ['data'],
  data () {
    return {
    }
  },
  methods: {
    toDetail () {
      this.$emit('toDetail', this.data.id)
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.main
  display flex
  background $white

.img
  width (128/20)rem
  height (128/20)rem
  flex-shrink 0
  overflow hidden
  img
    position relative
    display block
    height 100%
    left 50%
    transform translateX(-50%)

.content
  position relative
  display flex
  flex-direction column
  justify-content space-between
  padding 18px
  box-sizing border-box

.title
  font-size 13px
  line-height 20px
  display -webkit-box    //1.设置display类型为-webkit-box
  line-height 18px
  max-height 60px
  overflow hidden        //2.设置元素超出隐藏
  text-overflow ellipsis //3.设置超出样式为省略号
  -webkit-line-clamp 3   //4.设置2行应用省略
  -webkit-box-orient vertical

.price
  font-size 15px
  color $price

</style>
