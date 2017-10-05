<template>
  <div :class="$style.main">
    <div :class="$style.img">
      <img src="http://cdn01.dwfei.com/img/sell/1b8295d8c49446af9954af76a7c495bb.jpg">
    </div>
    <div :class="$style.content">
      <div :class="$style.title">厂家直销 直柄曲柄包胶固定杠铃 专业健身房用 无味家用健身器材</div>
      <div :class="$style.price">¥ 1280.00</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-bus-item',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.main
  display flex
  background $white
  box-shadow 0 0 6px 0 rgba(0,0,0,0.10)

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
