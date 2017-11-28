<template>
  <div :class="$style.main">
    <div :class="$style.itemImg">
      <img src="~public/about/fm_aboutus_pic01.jpg">
    </div>
    <div :class="$style.first">
      <div :class="$style.firstTxt1">
        <p>对健身，你是怎么看的？</p>
        <p>是一种运动的方式？</p>
        <p>是考验耐力与坚持？</p>
        <p>是要更完美的自己？</p>
      </div>
      <div :class="$style.dividerImg">
        <img src="~public/about/fm_divider.svg">
      </div>
      <div :class="$style.firstTxt2">健身爱好者&从业者，有更深的解读！</div>
    </div>
    <div :class="$style.itemImg">
      <img src="~public/about/fm_aboutus_pic02.jpg">
    </div>
    <div :class="$style.second">
      <div :class="$style.secondTxt1">
        健身地图是为健身爱好者及商家，提供高效解决方案的服务商。
      </div>
      <div :class="$style.secondTxt2">
        ——健身地图创立人<br>M.Soong
      </div>
    </div>
    <div :class="$style.itemImg">
      <img src="~public/about/fm_aboutus_pic03.jpg">
    </div>
    <Item :class="$style.item">
      <img src="~public/about/fm_aboutus_01.svg" slot="icon">
      <template slot="top">
        <p>投资/运营健身房，</p>
        <p>Boss们最关注什么？</p>
      </template>
      <template slot="bottom">
        <p>商圈竞争如何布局？</p>
      </template>
    </Item>
    <div :class="$style.itemImg">
      <img src="~public/about/fm_aboutus_pic04.jpg">
    </div>
    <div :class="$style.thrid">
      <div :class="$style.thridTxt">
        <p>使用健身地图的用户，能第一时间通过“查找”快速“搜索”了解“最近健身房”信息。</p>
        <p>协助区域经营布局，门店特色化经营规划，健身房线下信息一键获取</p>
      </div>
    </div>
    <div :class="$style.itemImg">
      <img src="~public/about/fm_aboutus_pic05.jpg">
    </div>
    <Item :class="$style.item">
      <img src="~public/about/fm_aboutus_02.svg" slot="icon">
      <template slot="top">
        <p>持续获客，如何销售？</p>
      </template>
      <template slot="bottom">
        <p>线上传播转化 | 线下获客提额</p>
        <span>重点锁定商家的区域进行传播，体验、转化、留存，拉新，有效直达目标用户群，快速提升门店销售额。</span>
      </template>
    </Item>
    <div :class="$style.itemImg">
      <img src="~public/about/fm_aboutus_pic06.jpg">
    </div>
    <Item :class="$style.item">
      <img src="~public/about/fm_aboutus_03.svg" slot="icon">
      <template slot="top">
        <p>后续发展，如何经营？</p>
      </template>
      <template slot="bottom">
        <span>健身地图种设置各项运营服务，规划设计，设备采购，招募培训，赢商管理……从传统向互联网化的转型，实施无缝接驳。</span>
      </template>
    </Item>
    <div :class="$style.itemImg">
      <img src="~public/about/fm_aboutus_pic07.jpg">
    </div>
    <Item :class="$style.item">
      <img src="~public/about/fm_aboutus_04.svg" slot="icon">
      <template slot="top">
        <p>健身地图，能做什么？</p>
      </template>
      <template slot="bottom">
        <p>为健身投资人提供全方位的投资信息</p>
        <span>健身地图是向健身产业投资者、经营者，提供高效无缝链接，提升资本运营、互联式、复合性的综合服务平台。</span>
      </template>
    </Item>
    <div :class="$style.itemImg">
      <img src="~public/about/fm_aboutus_pic08.jpg">
    </div>
    <div :class="$style.fourth">
      <div :class="$style.dividerImg">
        <img src="~public/about/fm_divider.svg">
      </div>
      <div :class="$style.fourthTit">让健身人群快速找到适合自己的健身场所</div>
      <div :class="$style.fourthTxt">
        <p>健身地图是一款让用户可以随时实地，快速便捷选择适合自己周边的健身俱乐部。是健身爱好者与健身俱乐部之间及时互动，满足消费需求，提供更优健身方案的工具类产品。</p>
      </div>
      <div :class="$style.dividerImg">
        <img src="~public/about/fm_divider.svg">
      </div>
    </div>
    <div :class="$style.itemImg">
      <img src="~public/about/fm_aboutus_pic09.jpg">
    </div>
    <div :class="$style.bottom">
      <div :class="$style.bottomTit">
        靠近风口不一定就能飞起<br>坚定理想，方能超越！
      </div>
      <div :class="$style.contact">
        <div :class="$style.contactItem">
          <span>商务合作：</span>
          <span>Chinafitmap@163.com</span>
        </div>
        <div :class="$style.contactItem">
          <span>联系电话：</span>
          <span>138888888818</span>
        </div>
      </div>
      <div :class="$style.qcode">
        <img src="~public/about/fm_aboutus_qcode.jpg">
      </div>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import Item from './components/item.vue'

export default {
  name: 'about-us',
  components: { Item },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
    this.$store.dispatch(Types.CHANGE_NAV, { title: `关于我们` })
  }
}
</script>

<style lang="stylus" module>
$white = #FFF
$black = #25272B
$breakline = #9DA2AB
$grey = #E1E5EB
$link = #57ABFF


img
  display block
  width 100%
.dividerImg img
  height 6px
.about01Img img
  height 30px

.main
  font-size 15px
  line-height 24px
.first
  padding 24px 0 46px
  text-align center
  font-size 15px
  color $black
  background $white
.firstTxt1
  margin-bottom 18px
  letter-spacing 0
  font-weight 300
  >p:first-child
    font-weight 500
.firstTxt2
  margin-top 18px
  font-weight 600

.second
  padding 24px 0
  font-size 15px
  background $black
  color $white
.secondTxt1
  margin 0 24px 18px
.secondTxt2
  text-align center
  font-weight 500

.thrid
  padding 24px 0
  background $grey
.thridTxt
  padding 0 24px
  >p
    position relative
    padding-left 14px
    &:before
      content ''
      position absolute
      width 8px
      height 8px
      background url('~public/about/fm_bullet.svg') no-repeat
      background-size 100% 100%
      left 0
      top 8px

.fourth
  padding 18px 24px
  background $white
.fourthTit
  margin-top 18px
  font-weight 600
  text-align center
.fourthTxt
  margin 18px 0

.bottom
  background $white
  padding 36px 0 60px
.bottomTit
  text-align center
  font-weight 600
.contact
  margin 18px auto
  width max-content
.contactItem
  >span:last-child
    color $link
.qcode
  margin 0 auto
  height 180px
  width 180px

.item
  background $white
  p
    text-align center
    font-weight 600
  span
    display block
    margin-top 18px

</style>
