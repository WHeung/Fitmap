const REDIRECTED = 'redirected'
const REDIRECT = 'redirect'
export function inRoute2outRoute ({ inRoute, urlSearch }) {
  const outParams = outRouteParams(urlSearch)
  const inParams = Object.assign({}, inRoute.query)
  if (outParams[REDIRECT]) {
    delete outParams[REDIRECT]
  }
  if (inParams[REDIRECTED]) {
    delete inParams[REDIRECTED]
  }
  inParams[REDIRECT] = inRoute.path
  const comboParams = Object.assign({}, outParams, inParams)
  return paramsToSearch(comboParams)
}
export function outRoute2inRoute ({ inRoute, urlSearch }) {
  const outParams = outRouteParams(urlSearch)
  const inParams = Object.assign({}, inRoute.query)
  let path = '/'
  if (outParams[REDIRECT]) {
    path = outParams[REDIRECT]
    delete outParams[REDIRECT]
  } else {
    path = inRoute.path
  }
  if (inParams[REDIRECTED]) {
    return null
  }
  if (!outRouteHasParams(urlSearch)) {
    return null
  }
  outParams[REDIRECTED] = 1
  const query = Object.assign({}, outParams)
  return {
    path: path,
    query: query
  }
}
export function inRouteParamsInherit ({ toRoute, fromRoute }) {
  if (toRoute.query.type) {
    delete toRoute.query.type
  }
  const path = toRoute.path
  const query = Object.assign({}, toRoute.query)

  if (fromRoute.query.redirected) {
    query[REDIRECTED] = 1
  }

  if (JSON.stringify(query) === JSON.stringify(toRoute.query)) {
    return null
  }

  return { path, query }
}
export function outRouteParams (urlSearch) {
  const search = urlSearch.replace('?', '')
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
export function outRouteHasParams (urlSearch) {
  const params = outRouteParams(urlSearch)
  if (Object.keys(params).length > 0 && params.constructor === Object) {
    return true
  } else {
    return false
  }
}
export function inRouteHasParams (route) {
  if (route.query && Object.keys(route.query).length > 0 && route.query.constructor === Object) {
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
