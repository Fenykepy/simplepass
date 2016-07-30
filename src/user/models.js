
export var create_user_scheme = {
  username: {
    type: 'string',
    max_length: 254,
    required: true
  },
  email: {
    type: 'email',
    required: true
  },
  // TODO add regex to ensure there is at least one number
  password: {
    type: 'string',
    max_length: 800,
    min_length: 8,
    required: true
  }
}
