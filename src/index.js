/**
 * Creates a new CheckerFactory
 * @param {String|Function} [validator] - If String, typeof is performed to match the type
 *   If Function, the function is executed. The function should return an Error if invalid
 * @param {String} [name] - name of checker factory
 * @return {Object} - a CheckerFactory
 */
module.exports = (validator, name) => ({
  /**
   * Retrieve checker factory's name
   *
   * @return {String} - name of checker factory
   */
  get name() {
    return name
  },
  /**
   * Set Checker as required
   *
   * @return {Object} - CheckerFactory
   */
  get isRequired() {
    this.required = true

    return this
  },
  /**
   * Determine if props are valid
   *
   * @param {*} prop - the prop to test
   * @param {String} key - the name of the prop
   * @return {Error|undefined} - If an invalid, an Error is returne. If valid, undefined is returned
   */
  validate(prop, key) {
    if (this.required && prop === undefined) {
      return new Error(`${key} is required`)
    }

    if (prop !== undefined) {
      if (typeof validator === 'string' && typeof prop !== validator) {
        const actualType = typeof prop

        return new TypeError(`Expected ${key} to be of type \`${validator}\`, but got \`${actualType}\``)
      }

      if (typeof validator === 'function') {
        return validator(prop, key)
      }
    }
  }
})
