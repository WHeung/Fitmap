import Vue from 'vue'
import Router from 'vue-router'
import * as Types from '~src/store/types.js'
import { inRoute2outRoute, outRoute2inRoute, inRouteParamsInherit } from '~src/tool/inRouteAndOutRoute'
import Store from '~src/store/index.js'
import { isWeixin } from '~src/tool/containerDetect.js'
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
const mapNavigateView = resolve => require.ensure(
  [], () => resolve(require('~src/views/map/navigateView/index.vue')),
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
const aboutUsView = resolve => require.ensure(
  [], () => resolve(require('~src/views/about/index.vue')),
  'au'
)
const testAMapView = resolve => require.ensure(
  [], () => resolve(require('~src/views/test/amap.vue')),
  'test'
)

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/amap',
      component: testAMapView,
      name: 'testAMapView'
    },
    { path: '/user', component: userView, name: 'userView' },
    { path: '/user/info', component: userInfoView, name: 'userInfoView' },
    { path: '/user/favor/:type', component: userfavoritesView, name: 'userfavoritesView' },
    { path: '/user/vaildPhone', component: vaildPhoneView, name: 'userChangePhoneView' },
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
    { path: '/map/navigate', component: mapNavigateView, name: 'mapNavigateView' },
    { path: '/detail/:type/:id(\\d+)', component: detailView, name: 'detailView' },
    { path: '/detail/:type/:id(\\d+)/pic', component: detailPicView, name: 'detailPicView' },
    { path: '/about', component: aboutUsView, name: 'aboutUsView' },
    { path: '/', component: RedirectView },
    { path: '*', component: NoFoundView }
  ]
})

router.beforeEach((to, from, next) => {
  /*
  * 平时最好不使用code 或者state来作为参数，微信授权登陆会自带
  */
  if (isWeixin() && to.path !== '/') {
    const token = window.document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    if (!token) {
      if (to.query.code) {
        Store.dispatch(Types.UPDATE_LOGIN_OAUTH, { code: to.query.code }).then(() => {
          const route = {
            path: to.path,
            query: Object.assign({}, to.query)
          }
          route.query.code = undefined
          router.replace(route)
        }).catch(() => {
          getOauth({ to })
        })
      } else {
        getOauth({ to })
      }
      return
    } else {
      Store.commit(Types.SET_USER, { token: token })
    }
  }
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
  // 进入内路由状态
  if (from.query.redirected || to.query.redirected) {
  } else {
    // 外路由进入内路由
    setSearch(to)
  }
})

function setSearch (route) {
  const result = outRoute2inRoute({
    inRoute: route,
    urlSearch: window.location.search
  })
  if (result) {
    router.replace(result)
  }
}

function getOauth ({ to }) { // 跳转微信授权
  const outQuery = inRoute2outRoute({
    inRoute: to,
    urlSearch: window.location.search
  })
  const callbackURL = window.location.origin + window.location.pathname + outQuery
  // https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
  window.location.href =
    'https://open.weixin.qq.com/connect/oauth2/authorize?' +
    'appid=wx232406f650474f6a' +
    '&redirect_uri=' + encodeURIComponent(callbackURL) +
    '&response_type=code' +
    '&scope=snsapi_userinfo' +
    '&state=STATE#wechat_redirect'
  return
}

export default router
