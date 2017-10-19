<template>
  <div :class="$style.main">
    <button
    :class="[$style.btn, btnClass, {[$style.disabled]: disabled}]"
    @click="clickBtn">{{title}}</button>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: ['type', 'title', 'disabled'],
  computed: {
    btnClass () {
      return this.type === 'blue' ? this.$style.blueBtn : this.$style.normalBtn
    }
  },
  methods: {
    clickBtn () {
      if (!this.disabled) {
        this.$emit('clickBtn')
      }
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.main
  margin 0 18px

.btn
  box-sizing border-box
  padding 12px 0
  width 100%
  font-size 16px
  text-align center
  border-radius 100px
  &:active
    opacity .6

.normalBtn
  color $mainText
  border 1px solid $mainText
.blueBtn
  color $white
  background $blueBtn
  box-shadow 0 4px 12px 0 rgba(87,171,255,0.60)
.disabled
  opacity .3
  &:active
    opacity .3

</style>
