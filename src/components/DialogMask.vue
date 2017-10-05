<template>
  <div :class="$style.dialogWp" @touchmove.prevent="">
    <div :class="$style.wp">
      <div :class="$style.title" v-if="dialog.title">{{dialog.title}}</div>
      <slot></slot>
      <div :class="$style.ensure" v-if="dialog.leftBtn || dialog.rightBtn">
        <span
        :class="[$style.leftBtn, {[$style.noRight]: !dialog.rightBtn}]" v-if="dialog.leftBtn"
        v-html="dialog.leftBtn" @click.stop="cancel"></span>
        <span
        :class="$style.rightBtn" v-if="dialog.rightBtn"
        v-html="dialog.rightBtn" @click.stop="ensure"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'dialog',
  props: ['dialog'],
  methods: {
    cancel () {
      this.$emit('cancel', this.dialog.type)
    },
    ensure () {
      this.$emit('ensure', this.dialog.type)
    }
  }
}
</script>


<style lang="stylus" module>
@import '~tool/vendor'

.dialogWp
  position fixed
  width 100%
  background rgba(0, 0, 0, 0.5)
  top 0
  left 0
  bottom 0
  z-index 50

.wp
  position absolute
  top 40%
  left 50%
  width (318/20)rem
  font-size 16px
  transform translate(-50%, -50%)
  -webkit-transform translate(-50%, -50%)
  border-radius 4px
  background-color $white
  padding 0

.title
  padding 18px 0
  text-align center
  font-size 16px

.ensure
  border-top 1px solid $breakline
  height 43px
  text-align center

.rightBtn
.leftBtn
  line-height 42px
  height 42px
  width 49%
  display inline-block
  vertical-align top

.noRight
  color $link

.rightBtn
  color $link
  border-left 1px solid $breakline

</style>
