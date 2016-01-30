# Checker Factory

[![NPM version](https://badge.fury.io/js/checker-factory.svg)](http://badge.fury.io/js/checker-factory) [![Build Status](https://travis-ci.org/dustinspecker/checker-factory.svg?branch=master)](https://travis-ci.org/dustinspecker/checker-factory) [![Coverage Status](https://img.shields.io/coveralls/dustinspecker/checker-factory.svg)](https://coveralls.io/r/dustinspecker/checker-factory?branch=master)

[![Code Climate](https://codeclimate.com/github/dustinspecker/checker-factory/badges/gpa.svg)](https://codeclimate.com/github/dustinspecker/checker-factory) [![Dependencies](https://david-dm.org/dustinspecker/checker-factory.svg)](https://david-dm.org/dustinspecker/checker-factory/#info=dependencies&view=table) [![DevDependencies](https://david-dm.org/dustinspecker/checker-factory/dev-status.svg)](https://david-dm.org/dustinspecker/checker-factory/#info=devDependencies&view=table)

> Checker Factory used by Deku Prop Type Validators

## Install

```bash
npm install --save checker-factory
```

## Usage

```javascript
import checkerFactory from 'checker-factory'

const numberChecker = checkerFactory('number')

numberChecker.validate('hello', 'age')
// => TypeError: Expected age to be of type `number`, but got `string`

numberChecker.validate(3, 'age')
// => undefined

const requiredString = checkerFactory('string').isRequired

requiredString.validate(undefined, 'name')
// => Error: name is required

const evenNumberChecker = checkerFactory((prop, key) => {
  if (prop % 2 === 1) {
    return new Error(`Expected ${key} to be an even number`)
  }
})

evenNumberChecker.validate(3, 'id')
// => Error: Expected id to be an even number
```

## API
### checkerFactory(name, validator)

Returns a CheckerFactory with an `isRequired` getter and `validate` function.

#### name
type: `string`

The name of the CheckerFactory. This name is how users will reference the checker.
For example, a name of **string** will have users using **propTypes.string**.

#### validator
type: `function` | `string`

If `validator` is a `string`, then a `typeof` check will be performed. If `validator` is a `function`, then the function will be execution. The function is passed the `prop` value and the `key` name.

## License
MIT © [Dustin Specker](https://github.com/dustinspecker)
