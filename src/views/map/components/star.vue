<template>
  <div :class="$style.star">
    <i :class="[$style.starIcon, {[$style.actIcon]: star >= index}, {[$style.halfIcon]: isHalfStar(index)}]"
    v-for="index in 5" :key="index"></i>
  </div>
</template>

<script>
export default {
  name: 'star-item',
  props: ['star'],
  methods: {
    isHalfStar (index) {
      const starArr = String(this.star).split('.')
      if (starArr[0] === String(index - 1) && starArr[1] === '5') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="stylus" module>
.star
  display flex
.starIcon
  width 12px
  height 12px
  background url('~public/fm_score_empty.svg') no-repeat
  background-size 100% 100%
.actIcon
  background-image url('~public/fm_score_full.svg')
.halfIcon
  background-image url('~public/fm_score_half.svg')
</style>
