import React, { Component, PropTypes } from 'react'

export default class FormRequiredFields extends Component {

  render() {
    return (
      <p
        className="required-fields"
      ><span className="colored">*</span> : required fields.</p>
    )
  }
}
