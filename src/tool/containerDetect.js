export function isWeixin () {
  return /micromessenger/i.test(window.navigator.userAgent)
}

export function isAndroid () {
  const ua = window.navigator.userAgent.toLowerCase()
  return /android/i.test(ua)
}

export function isIOS () {
  const ua = window.navigator.userAgent.toLowerCase()
  return /iP(hone|od|ad)/i.test(ua)
}
