import Vue from 'vue'
import Router from 'vue-router'
import * as Types from '~src/store/types'
import { inRoute2outRoute, outRoute2inRoute, inRouteParamsInherit } from '~src/tool/inRouteAndOutRoute'

import NoFoundView from '~src/views/NoFoundView.vue'
import RedirectView from '~src/views/RedirectView.vue'

// const CouponView = resolve => require.ensure(
//   [], () => resolve(require('~src/views/coupons/index.vue')),
//   'c'
// )

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: RedirectView },
    { path: '*', component: NoFoundView }
  ]
})

router.beforeEach((to, from, next) => {
  // 去掉继承会有其他问题,比如地址重定向会在每次刷新后回到初始页
  if (to.query.type === Types.ROUTE_TYPE_REPLACE) {
    const route = inRouteParamsInherit(to, from)
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
    const route = inRouteParamsInherit(to, from)
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
function setSearch (currentRouter) {
  if (execCount === 0) {
    return
  }
  execCount--
  const route = outRoute2inRoute(currentRouter)
  if (route) {
    router.replace(route)
  }
}

export default router
