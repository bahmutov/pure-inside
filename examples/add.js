function add(a, b) {
  return a + b
}
module.exports = add

if (!module.parent) {
  console.log('2 + 3 =', add(2, 3))
}
