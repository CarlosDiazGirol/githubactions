import { divide, multiply, subtract, sum } from './calculator.js'

test('sum(2, 3) returns 5', () => {
  expect(sum(2, 3)).toBe(5)
})

test('subtract(5, 2) returns 3', () => {
  expect(subtract(5, 2)).toBe(3)
})

test('multiply(4, 3) returns 12', () => {
  expect(multiply(4, 3)).toBe(6)
})

test('divide(10, 2) returns 5', () => {
  expect(divide(10, 2)).toBe(5)
})

test('divide(10, 0) throws the correct error', () => {
  expect(() => divide(10, 0)).toThrow('Cannot divide by zero')
})