import test from 'ava'

import checkerFactory from '../lib'

test('missing required prop should return Error', t => {
  const required = checkerFactory('string').isRequired

  const err = required.validate(undefined, 'name')
  t.truthy(err instanceof Error)
  t.is(err.message, 'name is required')
})

test('missing non-required prop should return undefined', t => {
  const nonRequired = checkerFactory('string')

  t.is(nonRequired.validate(undefined), undefined)
})

test('should return TypeError when typeof validator fails', t => {
  const typeofCheck = checkerFactory('string')

  const err = typeofCheck.validate(3, 'value')
  t.truthy(err instanceof TypeError)
  t.is(err.message, 'Expected value to be of type `string`, but got `number`')
})

test('should return value of validator function', t => {
  const validatorFunction = checkerFactory((prop, key) => {
    if (prop % 2 === 1) {
      return Error(`Expected ${key} to be even`)
    }
  })

  const err = validatorFunction.validate(1, 'age')
  t.truthy(err instanceof Error)
  t.is(err.message, 'Expected age to be even')
})

test('should return name when provided', t => {
  const withName = checkerFactory(undefined, 'dog')

  t.is(withName.name, 'dog')
})
