import React, { Component, PropTypes } from 'react'

import FormRequiredField from './FormRequiredField'

export default class FormRequiredFields extends Component {

  render() {
    return (
      <p
        className="required-fields"
        ><FormRequiredField /> : required fields.</p>
    )
  }
}
