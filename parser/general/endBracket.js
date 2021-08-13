module.exports = function(lines, scope) {
  if (!scope.inside) {
    throw new Error('unexpected "}"')
  }
  scope.inside = null
  return ''
}