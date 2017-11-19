export default function getOffsetTop (el) {
  if (typeof el === 'object') {
    var y = el.offsetTop
    while (el.offsetParent) {
      el = el.offsetParent
      y += el.offsetTop
    }
    return y
  } else {
    return 0
  }
}
