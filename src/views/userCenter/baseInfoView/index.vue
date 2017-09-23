<template>
  <div :class="$style.main">
    <div :class="$style.avatar">
      <img src="http://wx.qlogo.cn/mmhead/0sDCa2E8S1tpsYwWPibzhiciaLPJxX6ohkNJu2t4IXrF2mic8jbPlhrX2Q/0">
    </div>
    <div :class="$style.form">
      <Item title="昵称">
        <input :class="$style.input" placeholder="叫爸爸">
      </Item>
      <Item title="性别">
        <select :class="$style.input">
          <option value="Male">男</option>
          <option value="Female">女</option>
        </select>
      </Item>
      <Item title="城市">
        <select :class="$style.input">
          <option value="Male">男</option>
          <option value="Female">女</option>
        </select>
        <select :class="$style.input">
          <option value="Male">男</option>
          <option value="Female">女</option>
        </select>
        <select :class="$style.input">
          <option value="Male">男</option>
          <option value="Female">女</option>
        </select>
      </Item>
      <Item title="公司名称">
        <input :class="$style.input" placeholder="叫爸爸">
      </Item>
      <Item title="手机号">
        <input :class="$style.input" placeholder="叫爸爸">
      </Item>
      <Item title="验证码">
        <input :class="$style.input" placeholder="叫爸爸">
        <button :class="$style.btn">发送验证码</button>
      </Item>
      <div :class="$style.formBtn">
        <button :class="$style.submit">提交</button>
        <span :class="$style.skip">跳过</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import Item from './components/item.vue'

export default {
  name: 'baseinfo-view',
  components: { Item },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
  }
}
</script>

<style lang="stylus" module>
.avatar
  position relative
  margin 15px auto 0 auto
  width 74px
  height 74px
  overflow hidden
  background #fff
  border 2px solid #fff
  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
  border-radius 40px
  img
    position absolute
    top -3px
    left -3px
    width 80px
    height 80px

.form
  margin 20px 44px 0

.input
  border 1px solid #000

.btn
  padding 5px 10px
  color #0094FF
  &:active
    opacity .7

.formBtn
  position relative
  margin-top 20px
  text-align center

.submit
  padding 8px 25px
  color #FFFFFF
  background #0094FF
  border-radius 5px
  &:active
    opacity .7

.skip
  position absolute
  bottom 0
  color #3F51B5
  margin-left 20px
  &:active
    opacity .7

</style>
