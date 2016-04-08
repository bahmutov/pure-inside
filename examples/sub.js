var add = require('./add')
function sub (a, b) {
  return add(a, -b)
}
module.exports = sub

if (!module.parent) {
  console.log('10 - 3 =', sub(10, 3))
}
