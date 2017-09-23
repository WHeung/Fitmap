// 将内路由替换成外路由
// 原则是，内路由有参数的情况下不做覆盖，内路由参数优先
const REDIRECTED = 'redirected'
const REDIRECT = 'redirect'

export function inRoute2outRoute (route) {
  const outParams = outRouteParams()
  const inParams = Object.assign({}, route.query)
  if (outParams[REDIRECT]) {
    delete outParams[REDIRECT]
  }
  if (inParams[REDIRECTED]) {
    delete inParams[REDIRECTED]
  }
  inParams[REDIRECT] = route.path
  const comboParams = Object.assign({}, outParams, inParams)
  const search = paramsToSearch(comboParams)
  return window.location.pathname + search
  // /h5/?redirect=/index&owner_id=123
}

// 将外路由替换成内路由
// 如果内路由有参数redirected=1，则不做替换
export function outRoute2inRoute (route) {
  const outParams = outRouteParams()
  const inParams = Object.assign({}, route.query)
  let path = '/'
  if (outParams[REDIRECT]) {
    path = outParams[REDIRECT]
    delete outParams[REDIRECT]
  }
  if (inParams[REDIRECTED]) {
    return null
  }
  if (!outRouteHasParams()) {
    return null
  }
  outParams[REDIRECTED] = 1
  const query = Object.assign({}, outParams)
  return {
    path: path,
    query: query
  }
  /*
  {
    path: '/index',
    query: {
      redirected: 1
    }
  }
  */
}

// 参数继承和添加
// 添加apppullrefresh 用来关闭app下拉刷新
// 继承redirected 用来标记已处理外路由转内路由
export function inRouteParamsInherit (to, from) {
  // 清理type参数，type用一次就要销毁
  // type用来标记跳转类型，比如replaceState
  if (to.query.type) {
    delete to.query.type
  }
  const path = to.path
  const query = Object.assign({}, to.query)

  if (from.query.redirected) {
    query[REDIRECTED] = 1
  }

  if (to.meta.appPullRefresh === 'disabled') {
    query['apppullrefresh'] = 0
  } else {
    delete query['apppullrefresh']
  }

  if (JSON.stringify(query) === JSON.stringify(to.query)) {
    return null
  }

  return { path, query }
}

// 外路由参数转成对象
export function outRouteParams () {
  const search = window.location.search.replace('?', '')
  if (search.indexOf('=') < 0) {
    return {}
  }
  const searchArr = search.split('&')
  const params = {}
  searchArr.forEach(function (str) {
    if (/^[^=]+=[^=]+$/.test(str)) {
      str = str.split('=')
      params[str[0]] = str[1]
    }
  })
  return params
}

export function outRouteHasParams () {
  const params = outRouteParams()
  if (Object.keys(params).length > 0 && params.constructor === Object) {
    return true
  } else {
    return false
  }
}

export function inRouteHasParams (route) {
  if (Object.keys(route.query).length > 0 && route.query.constructor === Object) {
    return true
  } else {
    return false
  }
}

export function paramsToSearch (params) {
  let search = ''
  for (const key in params) {
    search = search + `&${key}=${params[key]}`
  }
  if (search.length > 0) {
    search = '?' + search.replace(/^&/, '')
  }
  return search
}
