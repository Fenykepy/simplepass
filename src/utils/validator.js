
function test_regex(value, regex, error_message) {
  // test against a regex, return value or 
  // throw an error_message
  if (regex.test(value)) {
    return value
  }
  throw error_message
}

function test_email(value) {
  // test if value is valid email
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  let message = 'Enter a valid email address.'
  return test_regex(value, re, message)
}

function test_url(value) {
  // test if value is valid url
  let re = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
  let message = 'Enter a valid url.'
  return test_regex(value, re, message)
}

function test_choices(value, choices) {
  // test against an array of values, return value
  // or throw an error message
  if (choices.some(choice => choice === value)) {
    return value
  }
  let repr_choices = choices.reduce((prev, cur) =>
        prev + ', ' + JSON.stringify(cur))
  throw `This field must be one of ${repr_choices}.`
}

function test_undefined(value, required, default_value) {
  // test for undefined values
  // return default, undefined or raise error if it's required
  if (typeof(default_value) !== 'undefined') return default_value
  if (! required) return value
  throw 'This field is required.'
}




export function validate_field(value, options) {
  /*
   * A simple validator for form fields
   * value : field content to validate
   * options: object with parameters to validate:
   *    type: (string, required) any type returned by typeof() or:
   *      'date' for dates TODO,
   *      'datetime' for dates with time TODO
   *      'time' for times TODO,
   *      'email',
   *      'url',
   *      'integer' shortcut for {type: 'number', decimal_places: 0} TODO
   *
   *    required: (boolean, optional, default true),
   *      if not true, return an error if value is undefined
   *    max_length: (number, optional)
   *    min_length: (optional)
   *    max_digits: (integer, optional) max number of digits except leading 0 TODO
   *    decimal_places: (integer, optional) max number of digits after decimal point TODO
   *    allow_null: (boolean, optional, default to false)
   *    allow_blank: (boolean, optional, default to false)
   *    regex: (regular expression, optional) to validate against a custom regular expression
   *    regex_error_message: (string, required with regex) error message throw when
   *      regex validation fails
   *
   *    choices: (array, optional) value must be equal to an array item)
   *    default: (any type, optionnal) used if value is undefined)
   *
   *    returns true if no errors
   *    returns a list of string otherwise
   *
   */

  // we check choices if it's one of them, no other validation to do
  if (options.choices) {
    return test_choices(value, options.choices)
  }

  // if value is undefined
  if (typeof(value) === 'undefined') {
    return test_undefined(value, options.required, options.default)
  }

  // we check specific types
  // emails
  if (options.type === 'email') return test_email(value)
  // urls
  if (options.type === 'url') return test_url(value)



  // we check javascript default types
  if (typeof(value) != options.type) {
    throw `This field must be of type ${options.type}.`
  }

  // we check null values
  if (value === null && ! options.allow_null) {
    throw 'This field cannot be null.'
  }

  // special checks for numbers
  if (typeof(value) == 'number') {
    // check max length
    if (options.max_length && value > options.max_length) {
      throw `This field cannot be greater than ${options.max_length}.`

    }
    // check min length
    if (options.min_length && value < options.min_length) {
      throw `This field cannot be smaller than ${options.min_length}.`
    }
  }

  // special checks for strings
  if (typeof(value) == 'string') {
    // check empty strings
    if(value == "" && ! options.allow_blank) {
      throw 'This field cannot be blank.'
    }
    // check max length
    if (options.max_length && value.length > options.max_length) {
      throw `This field cannot be longer than ${options.max_length} characters.`
    }
    // check for min length
    if (options.min_length && value.length < options.min_length) {
      throw `This field cannot be less than ${options.min_length} characters.`
    }
    // check against regex
    if (options.regex) {
      return test_regex(value, options.regex, options.regex_error_message)
    }
  }

  // otherwise return value
  return value

}

function validate_object(data, validation_scheme) {
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
      let value = validate_field(data[key], validation_scheme[key])
      validated_data[key] = value
    }
    catch (error) {
      // in case of error, we add list of errors to errors object
      errors[key] = error
    }
  })
  console.log(errors)

  if (Object.keys(errors).length > 0) throw errors
  console.log('no errors, return validated data')
    
  return validated_data

}



export default validate_object
