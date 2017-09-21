'use strict'

import Heap from './heap'

import mocha = require('mocha')
import expect = require('expect')

describe("Heap", () => {
  it('finds left child of a node', () => {
    const heap = new Heap([1, 3, 6, 12, 15, 23, 34, 45, 56])
    expect(heap.leftChildIndex(1)).toEqual(3)
  })
})