<template>
  <div :class="[$style.main, {[$style.originList]: origin !== 'index' }]">
    <div :class="[$style.container, {[$style.topWhite]: origin !== 'index' }]">
      <div
      :class="[$style.classifyGroup,{[$style.dropUp]:mask === true}]"
      @click="clickClassify">
        {{selectedCate.name}}
      </div>
      <div :class="[$style.searchGroup, {[$style.minSearch]:origin !== 'index' }]" @click="searchClick">
        <div :class="$style.mockInput" v-if="!searchView">{{input || '搜索'}}</div>
        <input v-else v-model="input" @keyup.enter="search" placeholder="搜索" ref="input">
        <i @click.stop="clearInput"></i>
      </div>
      <div :class="$style.mapIcon" v-if="origin === 'list'" @click="toMap"></div>
      <div :class="$style.searchIcon" v-if="origin === 'search'" @click="search">搜索</div>
    </div>
    <div :class="$style.maskContent" v-if="mask">
      <div :class="$style.classify">
        <div
        :class="[$style.classItem, {[$style.activeClass]: selected[0] === index}]"
        v-for="(type,index) in classTypes" :key="type.data"
        @click="choiceType(index)">{{type.name}}</div>
      </div>
      <div :class="$style.classify">
        <div
        :class="[$style.classItem, {[$style.activeItem]: selected[1] === index}]"
        v-for="(cate,index) in categorys" :key="cate.data"
        @click="choiceCate(index)">{{cate.name}}</div>
      </div>
    </div>
    <div :class="$style.maskLayer" v-if="mask === true" @click="clickClassify"></div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
export default {
  name: 'map-filter',
  data () {
    const classTypes = [
      {
        name: '商家',
        data: 'merchant'
      }, {
        name: '帖子',
        data: 'post'
      }
    ]
    const classCategorys = {
      merchant: [
        {
          name: '健身房',
          data: 'gym'
        },
        {
          name: '室内设计',
          data: 'design'
        },
        {
          name: '健身培训',
          data: 'train'
        },
        {
          name: '室内器材',
          data: 'equip'
        }
      ],
      post: [
        {
          name: '场地租凭',
          data: 'lease'
        },
        {
          name: '转让信息',
          data: 'transfer'
        },
        {
          name: '人员招聘',
          data: 'recruit'
        },
        {
          name: '设计招标',
          data: 'bid'
        }
      ]
    }
    return {
      mask: false,
      input: '',
      selected: [0, 0],
      classTypes,
      classCategorys
    }
  },
  props: ['origin', 'updateForm', 'form'],
  created () {
  },
  watch: {
    updateForm: {
      handler (val) {
        this.input = this.form.input
        this.selected = [].concat(this.form.selected)
        if (this.$parent.$route.name === 'mapSearchView') {
          if (this.$refs.input) {
            setTimeout(() => {
              this.$refs.input.focus()
            }, 1000)
          }
        }
      }
    }
  },
  computed: {
    searchView () {
      return this.$parent.$route.name === 'mapSearchView'
    },
    classType () {
      return this.classTypes[this.selected[0]]
    },
    categorys () {
      const typeKey = this.classTypes[this.selected[0]].data
      return this.classCategorys[typeKey]
    },
    selectedCate () {
      return this.categorys[this.selected[1]]
    }
  },
  methods: {
    clickClassify () {
      this.mask = !this.mask
    },
    toMap () {
      this.$router.push({ name: 'mapIndexView' })
    },
    searchClick () {
      this.$emit('searchClick')
    },
    search () {
      const form = {
        input: this.input,
        selected: this.selected
      }
      const data = {
        keyword: form.input,
        type: this.classType.data,
        category: this.selectedCate.name
      }
      this.$store.commit(Types.SET_MAP_FILTERS_FORM, form)
      this.$emit('search', data)
    },
    clearInput () {
      this.input = ''
      this.$store.commit(Types.SET_MAP_FILTERS_FORM, { input: this.input })
      if (this.origin !== 'search') {
        // 请求
        const data = {
          keyword: this.input,
          type: this.classType.data,
          category: this.selectedCate.name
        }
        this.$emit('request', data)
      }
    },
    choiceType (index) {
      if (this.selected[0] === index) {
        return
      }
      this.selected = [index, 0]
    },
    choiceCate (index) {
      if (this.selected[1] === index) {
        return
      }
      this.$set(this.selected, 1, index)
      this.mask = false
      if (this.origin !== 'search') {
        const form = {
          input: this.input,
          selected: this.selected
        }
        const data = {
          keyword: form.input,
          type: this.classType.data,
          category: this.selectedCate.name
        }
        this.$store.commit(Types.SET_MAP_FILTERS_FORM, form)
        this.$emit('request', data)
      }
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.maskLayer
  position fixed
  top 0
  width 100%
  height 100%
  background rgba(0, 0, 0, .5)
  z-index 3

.container
  position relative
  padding 12px
  display flex
  white-space nowrap
  justify-content space-between
  align-items center
  z-index 5
.topWhite
  z-index 5
  background $white
  border-bottom 1px solid $breakline
.originList
  position fixed
  top 0
  width 100%
  z-index 5
  background $white
  border-bottom 1px solid $breakline
  .classifyGroup
    box-shadow none
    border 1px solid $border
  .searchGroup
    box-shadow none
    border 1px solid $border

.classifyGroup
  flex-shrink 0
  position relative
  width 56px
  overflow hidden
  padding 6px 42px 6px 12px
  background #FFFFFF
  box-shadow 0 3px 6px 0 rgba(0,0,0,0.10)
  border-radius 100px
  line-height 21px
  &:after
    content ''
    position absolute
    width 16px
    height 16px
    background url('~src/public/fm_dropdown.svg') no-repeat
    background-size 100% 100%
    top 50%
    right 10px
    transform translateY(-50%)
    transition all .3s ease
  &.dropUp:after
    transform translateY(-50%) rotate(180deg)

.searchGroup
  position relative
  margin-left 6px
  padding 6px 28px 6px 40px 
  flex 1 1 auto
  box-sizing border-box
  background #FFFFFF
  box-shadow 0 3px 6px 0 rgba(0,0,0,0.10)
  max-width (235/20)rem
  border-radius 100px
  &.minSearch
    max-width (189/20)rem
  &:before,>i
    content ''
    position absolute
    top 50%
    transform translateY(-50%)
  &:before
    width 14px
    height 14px
    left 12px
    background url('~src/public/fm_search.svg') no-repeat
    background-size 100% 100%
  >i
    width 16px
    height 16px
    right 12px
    background url('~src/public/fm_clear.svg') no-repeat
    background-size 100% 100%
  .mockInput
    color #888
    overflow-x scroll
  >input
    line-height 21px
    width 100%


.mapIcon
  margin-left 12px
  width 28px
  height 28px
  background url('~src/public/fm_map.svg') no-repeat
  background-size 100% 100%
.searchIcon
  margin-left 12px
  font-size 16px
  color $link
  font-weight 600
  &:active
    opacity .6

.maskContent
  position relative
  margin 12px
  background #fff
  border-radius 3px
  height 216px
  z-index 5
  &:after
    content ''
    position absolute
    top 0
    left 50%
    height 100%
    width 1px
    background $breakline

.classify
  display inline-block
  box-sizing border-box
  padding 12px 0
  width 50%
  height 100%
  vertical-align top
  &:last-child
    overflow-y scroll

.classItem
  padding-left 18px
  height 48px
  line-height 48px
  font-size 16px
  color $assistText
  box-sizing border-box
  
.activeClass
  border-top 1px solid $breakline
  border-bottom 1px solid $breakline
  position relative
  color $mainText
  &:after
    content ''
    position absolute
    height 46px
    width 5px
    background #fff
    right -2px
    z-index 4

.activeItem
  color $mainText
</style>
