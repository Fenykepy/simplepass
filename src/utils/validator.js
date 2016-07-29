
export function fieldValidator(value, options) {
  /*
   * A simple validator for form fields
   * value : field content to validate
   * options: object with parameters to validate:
   *    type: (string, required) any type returned by typeof() or:
   *      'date' for dates TODO,
   *      'datetime' for dates with time TODO
   *      'time' for times TODO,
   *      'email' TODO,
   *      'url' TODO,
   *      'integer' shortcut for {type: 'number', decimal_places: 0} TODO
   *
   *    optional: (boolean, optional, default false),
   *      if not true, return an error if value is undefined
   *    max_length: (number, optional)
   *    min_length: (optional)
   *    max_digits: (integer, optional) max number of digits except leading 0 TODO
   *    decimal_places: (integer, optional) max number of digits after decimal point TODO
   *    allow_null: (boolean, optional, default to false)
   *    allow_blank: (boolean, optional, default to false)
   *
   *    choices: (array, optional) value must be equal to an array item)
   *    default: (any type, optionnal) used if value is undefined)
   *
   *    returns true if no errors
   *     returns a list of string otherwise
   *
   *    TODO: add regex validation, with custom error message
   *    TODO: add email validation
   *    TODO: add url validation
   *    TODO: add integer validation
   *    
   */

  // we check choices if it's one of them, no other validation to do
  if (options.choices) {
    if (options.choices.some(choice => choice === value )) return value
    let string_choices = array.reduce((prev, cur) =>
          prev + ', ' + JSON.stringify(cur))
    throw [`This field must be one of ${string_choices}.`]
  }

  // if value is undefined
  if (value === undefined) {
    // if it's not optional and we have no default, throw error
    if (! options.optional && ! options.default) {
      throw ['This field is required.']
    }
    // if we have a default we return it, undefined otherwise
    return options.default || value
  }

  // we check type
  if (typeof(value) != options.type) {
    throw [`This field must be of type ${options.type}.`]
  }

  // we check null values
  if (value === null && ! options.allow_null) {
    throw ['This field cannot be null.']
  }

  // special checks for numbers
  if (typeof(value) == 'number') {
    // check max length
    if (options.max_length && value > max_length) {
      throw [`This field cannot be greater than ${options.max_length}.`]

    }
    // check min length
    if (options.min_length && value < min_length) {
      throw [`This field cannot be smaller than ${options.min_length}.`]
    }
  }

  // special checks for strings
  if (typeof(value) == 'string') {
    // check empty strings
    if(value == "" && ! options.allow_blank) {
      throw ['This field cannot be blank.']
    }
    // check max length
    if (options.max_length && value.length > max_length) {
      throw [`This field cannot be longer than ${options.max_length} characters.`]
    }
    if (options.min_length && value.length < min_length) {
      throw [`This field cannot be less than ${options.max_length} characters.`]
    }
  }



  // otherwise return value
  return value

}

function objectValidator(data, validation_scheme) {
  /*
   * Object validator
   *
   * Take an object and a validation scheme as argument
   * For each property present in scheme, validate it with given arguments
   * Object property not in scheme are ignore.
   *
   * Returns a validated object if no errors.
   * Returns a list of errors per property otherwise
   *
   * Example:
   *
   *  data: {
   *    name: 'John',
   *    age: 23,
   *    height: 123, // will be ignored as not present in validator
   *  }
   *
   *  validation_scheme: {
   *    name: {type: 'string', max_length: 23},
   *    age: {type: 'number', max_length: '150'}
   *  }
   *
   *  returned value :
   *  { name: 'John', age: 23 }
   *
   *  With same scheme:
   *
   *  data: {
   *    name: undefined,
   *    age: '355',
   *  }
   *
   *  returned value: {
   *    name: ['This field is required'],
   *    age: ['This field cannot be greater than 150.']
   *  }
   */

  let errors = {}
  let validated_data = {}

  Object.keys(validation_scheme).forEach(key => {
    try {
      // we validate fields one by one and we add them to validated_data
      let value = fieldValidator(data[key], validation_scheme[key])
      validated_data[key] = value
    } catch (error) {
      console.log(error)
      // in case of error, we add list of errors to errors object
      errors[key] = error
    }
  })

  if (errors.length > 0) return errors
    
  return validated_data

}



export default objectValidator
