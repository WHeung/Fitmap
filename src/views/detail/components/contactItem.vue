<template>
  <div :class="$style.main">
    <div :class="$style.item" @click="toMap">
      <div :class="[$style.icon, $style.locationIcon]"></div>
      <div :class="$style.text">{{location.location}}</div>
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
    <DialogMask :dialog="dialog" v-if="dialog.show" @cancel="cancelMask">
      <div>
        <div :class="$style.phoneItem" @click="chosePhone(phone)"
        v-for="(phone,index) in telephones" :key="index">
          <span>电话{{index + 1}}</span>
          <span :class="$style.phoneCon">{{phone}}</span>
        </div>
      </div>
    </DialogMask>
  </div>
</template>

<script>
import DialogMask from '~src/components/DialogMask.vue'
import * as Types from '~src/store/types'
export default {
  name: 'around-item',
  components: { DialogMask },
  props: ['location', 'telephones'],
  data () {
    return {
      dialog: {
        show: false,
        title: '拨打电话'
      }
    }
  },
  methods: {
    clickPhone () {
      if (typeof this.telephones === 'object' && this.telephones.length) {
        if (this.telephones.length === 1) {
          window.location.href = 'tel:' + this.telephones[0]
        } else {
          this.dialog.show = true
        }
      }
    },
    cancelMask (val) {
      this.dialog.show = false
    },
    chosePhone (phone) {
      window.location.href = `tel:${phone}`
    },
    toMap () {
      this.$emit('toMap')
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

.phoneItem
  padding 0 18px
  height 48px
  line-height 48px
  display flex
  justify-content space-between
  &:active
    background $breakline
.phoneCon
  color $assistText

</style>
