<template>
  <div :class="$style.main">
    <div :class="$style.item">
      <div :class="[$style.icon, $style.locationIcon]"></div>
      <div :class="$style.text">{{location}}</div>
      <div :class="$style.arrow"></div>
    </div>
    <p :class="$style.line"></p>
    <div :class="$style.item" @click="clickPhone">
      <div :class="[$style.icon, $style.phoneIcon]"></div>
      <div :class="$style.text">
        <span v-for="phone in telephones" :key="phone"><i>, </i>{{phone}}</span>
      </div>
      <div :class="$style.arrow"></div>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
export default {
  name: 'around-item',
  props: ['location', 'telephones'],
  methods: {
    clickPhone () {
      if (typeof this.telephones === 'object' && this.telephones.length) {
        if (this.telephones.length === 1) {
          window.location.href = 'tel:' + this.telephones[0]
        } else {
          let word = ''
          for (let i = 0; i < this.telephones.length; i++) {
            word += `<p onclick="window.location.href='tel:'${this.telephones[i]}">${this.telephones[i]}</p>`
          }
          this.$store.dispatch(Types.OPEN_POPUP, {
            title: '拨打电话',
            word: word,
            leftMsg: '关闭'
          })
        }
      }
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.item
  padding 12px 18px
  display flex
  align-items center
  font-size 14px
.icon
  flex 0 0 auto
  margin-right (12/20)rem
  width 28px
  height 28px
  background-repeat no-repeat
  background-size 100% 100%
  &.locationIcon
    background-image url('~public/fm_list_locate.svg')
  &.phoneIcon
    background-image url('~public/fm_list_call.svg')
.text
  margin-right 12px
  flex 1 1 auto
  >span
    white-space nowrap
    &:first-child i
      display none
.arrow
  flex 0 0 auto
  height 16px
  width 16px
  background url('~public/fm_goto.svg') no-repeat
  background-size 100% 100%
.line
  margin-left 18px
  height 1px
  background $breakline

</style>
