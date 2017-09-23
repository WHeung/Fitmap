<template>
  <div :class="$style.main">
    <div :class="$style.item">
      <div :class="$style.avatar">
        <img src="http://wx.qlogo.cn/mmhead/0sDCa2E8S1tpsYwWPibzhiciaLPJxX6ohkNJu2t4IXrF2mic8jbPlhrX2Q/0">
      </div>
      <div :class="$style.txtContent">
        <div>商家名称</div>
        <div>新港中路丽影广场6楼</div>
      </div>
      <div :class="$style.type">
        <span>健身房</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'business-View'
}
</script>

<style lang="stylus" module>
.item
  display flex
  margin-bottom 10px
  padding 12px 5px

.avatar
  position relative
  margin 0 20px
  width (80/20)rem
  height (80/20)rem
  overflow hidden
  background #fff
  border-radius 100px
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

.type
  display flex
  flex-direction column
  white-space nowrap
  span
    padding 5px 20px
</style>
