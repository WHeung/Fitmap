<template>
  <div :class="$style.main">
    <div :class="$style.item">
      <div :class="$style.avatar">
        <img src="http://wx.qlogo.cn/mmhead/0sDCa2E8S1tpsYwWPibzhiciaLPJxX6ohkNJu2t4IXrF2mic8jbPlhrX2Q/0">
      </div>
      <div :class="$style.txtContent">
        <div>商品名称</div>
        <div>￥4500</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'products-View'
}
</script>

<style lang="stylus" module>
.item
  display flex
  margin-bottom 10px

.avatar
  position relative
  width (160/20)rem
  height (100/20)rem
  overflow hidden
  background #fff
  img
    position absolute
    height 100%
    left 50%
    transform translateX(-50%)

.txtContent
  flex 1 0 auto
  display flex
  flex-direction column
  justify-content space-around
  white-space nowrap

</style>
