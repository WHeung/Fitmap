import Vue from 'vue'
import Router from 'vue-router'
import * as Types from '~src/store/types'
import { inRoute2outRoute, outRoute2inRoute, inRouteParamsInherit } from '~src/tool/inRouteAndOutRoute'

import NoFoundView from '~src/views/NoFoundView.vue'
import RedirectView from '~src/views/RedirectView.vue'

const userView = resolve => require.ensure(
  [], () => resolve(require('~src//views/userCenter/indexView/index.vue')),
  'u'
)
const userInfoView = resolve => require.ensure(
  [], () => resolve(require('~src//views/userCenter/baseInfoView/index.vue')),
  'u'
)
const userfavoritesView = resolve => require.ensure(
  [], () => resolve(require('~src/views/userCenter/favoritesView/index.vue')),
  'u'
)
const vaildPhoneView = resolve => require.ensure(
  [], () => resolve(require('~src/views/userCenter/registerView/vaildPhoneView.vue')),
  'u'
)
const coummateInfoView = resolve => require.ensure(
  [], () => resolve(require('~src/views/userCenter/registerView/coummateInfoView.vue')),
  'u'
)
const map = resolve => require.ensure(
  [], () => resolve(require('~src/views/map/index.vue')),
  'm'
)
const mapIndexView = resolve => require.ensure(
  [], () => resolve(require('~src/views/map/indexView/index.vue')),
  'm'
)
const mapSearchView = resolve => require.ensure(
  [], () => resolve(require('~src/views/map/searchView/index.vue')),
  'm'
)
const mapListView = resolve => require.ensure(
  [], () => resolve(require('~src/views/map/listView/index.vue')),
  'm'
)
const detailView = resolve => require.ensure(
  [], () => resolve(require('~src/views/detail/indexView/index.vue')),
  'd'
)
const detailPicView = resolve => require.ensure(
  [], () => resolve(require('~src/views/detail/picView/index.vue')),
  'd'
)

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/user/:id(\\d+)', component: userView, name: 'userView' },
    { path: '/user/:id(\\d+)/info', component: userInfoView, name: 'userInfoView' },
    { path: '/user/:id(\\d+)/favor/:type', component: userfavoritesView, name: 'userfavoritesView' },
    { path: '/user/:id(\\d+)/vaildPhone', component: vaildPhoneView, name: 'userChangePhoneView' },
    { path: '/user/register/phone', component: vaildPhoneView, name: 'registerPhoneView' },
    { path: '/user/register/info', component: coummateInfoView, name: 'coummateInfoView' },
    {
      path: '/map',
      name: 'mapView',
      component: map,
      children: [
        {
          path: '/map/index',
          component: mapIndexView,
          name: 'mapIndexView'
        },
        {
          path: '/map/search',
          component: mapSearchView,
          name: 'mapSearchView'
        },
        {
          path: '/map/list',
          component: mapListView,
          name: 'mapListView'
        }
      ]
    },
    { path: '/detail/:type/:id(\\d+)', component: detailView, name: 'detailView' },
    { path: '/detail/:type/:id(\\d+)/pic', component: detailPicView, name: 'detailPicView' },
    { path: '/', component: RedirectView },
    { path: '*', component: NoFoundView }
  ]
})

router.beforeEach((to, from, next) => {
  // 去掉继承会有其他问题,比如地址重定向会在每次刷新后回到初始页
  const route = inRouteParamsInherit({ toRoute: to, fromRoute: from })
  if (to.query.type === Types.ROUTE_TYPE_REPLACE) {
    if (route) {
      next({
        ...route,
        replace: true
      })
    } else {
      next({
        path: to.path,
        query: to.query,
        replace: true
      })
    }
  } else {
    if (route) {
      // 如果路径相等则使用replace
      if (to.path === from.path) {
        next({
          ...route,
          replace: true
        })
      } else {
        next(route)
      }
    } else {
      next()
    }
  }
})

router.afterEach((to, from, next) => {
  window.document.body.scrollTop = 0
  setSearch(to)
})

let execCount = 1
function setSearch (route) {
  if (execCount === 0) {
    return
  }
  execCount--
  const result = outRoute2inRoute({
    inRoute: route,
    urlSearch: window.location.search
  })
  if (result) {
    router.replace(route)
  }
}

export default router
