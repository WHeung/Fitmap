import * as Types from '~src/store/types'

export default function routerReplace (context, path, query) {
  if (query) {
    if (query.type) {
      console.log('%c query no can sent type prop', 'color:red;')
    }
  } else {
    query = {}
  }
  context.$router.replace({
    path: path,
    query: {
      ...query,
      type: Types.ROUTE_TYPE_REPLACE
    }
  })
}
