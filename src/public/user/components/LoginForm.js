import React, { Component, PropTypes } from 'react'


import FormRequiredFields from 'public/app/components/FormRequiredFields'
import FormRequiredField from 'public/app/components/FormRequiredField'
import FormFieldErrors from 'public/app/components/FormFieldErrors'

export default class LoginForm extends Component {

  render() {
    //console.log('LoginForm', this.props)
    return (
      <form
        id={this.props.id}
        onSubmit={this.props.onSubmit}
      >
        <div className="field-wrapper">
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'non_field_errors'}
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-username">Username:<FormRequiredField /></label>
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
          <label htmlFor="id-password">Password:<FormRequiredField /></label>
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
