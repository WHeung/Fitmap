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
  'ui'
)
const userfavoritesView = resolve => require.ensure(
  [], () => resolve(require('~src/views/userCenter/favoritesView/index.vue')),
  'uf'
)
const mapView = resolve => require.ensure(
  [], () => resolve(require('~src/views/map/index.vue')),
  'm'
)
const mapTestView = resolve => require.ensure(
  [], () => resolve(require('~src/views/map/test.vue')),
  'mt'
)

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/user/:id', component: userView, name: 'userView' },
    { path: '/user/:id/info', component: userInfoView, name: 'userInfoView' },
    { path: '/user/:id/favor', component: userfavoritesView, name: 'userfavoritesView' },
    {
      path: '/map',
      component: mapView,
      name: 'mapView',
      children: [{
        path: '/map/test',
        component: mapTestView,
        name: 'mapTestView'
      }]
    },
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
