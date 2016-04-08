'use strict'

/* global describe, it */
describe('add', () => {
  const add = require('../examples/add')
  it('adds numbers', () => {
    console.assert(add(2, 3) === 5)
  })
})

describe('sub', () => {
  const sub = require('../examples/sub')
  it('subtracts numbers', () => {
    console.assert(sub(2, 3) === -1)
  })
})
