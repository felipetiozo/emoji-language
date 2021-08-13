module.exports = function(line, scope) {
  const id = line.split(' ')[1]

  scope.global[id] = {
    type: 'string',
    value: ''
  }
  
  return `${id} = input()`
}
