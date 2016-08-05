import React, { Component, PropTypes } from 'react'


import FormFieldErrors from '../../app/components/FormFieldErrors'
import FormRequiredFields from '../../app/components/FormRequiredFields'

export default class LoginForm extends Component {

  render() {
    console.log('LoginForm', this.props)
    return (
      <form
        id={this.props.id}
      >
        <FormRequiredFields />
        <div className="field-wrapper">
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'non_field_errors'}
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-username">Username:<span
              className="red"> *</span></label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'username'}
          />
          <input id="id-username"
            name="username"
            type="text"
            value={this.props.username}
            maxLength="254"
            onChange={this.props.handleUsernameChange.bind(this)}
            required
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-password">Password:<span
              className="red"> *</span></label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'password'}
          />
          <input id="id-password"
            name="password"
            type="password"
            value={this.props.password}
            maxLength="254"
            onChange={this.props.handlePasswordChange.bind(this)}
            required
          />
        </div>
      </form>
    )
  }
}
