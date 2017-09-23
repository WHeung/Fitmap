<template>
  <div :class="$style.main">
    <div :class="$style.item">
      <div :class="$style.top">
        <div :class="$style.title">这里是帖子名字，只显示一行</div>
        <div :class="$style.tag">场地租赁</div>
      </div>
      <div :class="$style.mid">
        这里是帖子内容的前面一些字，这里显示一行就好
      </div>
      <div :class="$style.bottom">
        <div :class="$style.address">新港中路丽影广场6楼</div>
        <div :class="$style.time">2017-9-14 12:46</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'posts-View'
}
</script>

<style lang="stylus" module>
.item
  margin-bottom 10px
  padding 6px

.top
  display flex
  justify-content space-between
.title
  font-size 20px
.tag
  padding 5px 20px
  background #abf
  border-radius 4px

.bottom
  display flex
  justify-content space-between
</style>
