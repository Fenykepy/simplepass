import React, { Component, PropTypes } from 'react'


import FormFieldErrors from '../../app/components/FormFieldErrors'
import FormRequiredFields from '../../app/components/FormRequiredFields'

export default class LoginForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.handleSubmit(this.state)
  }

  render() {
    console.log('LoginForm', this.props)
    return (
      <form
        onSubmit={this.props.handleSubmit}
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
            value={this.state.username}
            maxLength="254"
            onChange={this.handleUsernameChange.bind(this)}
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
            value={this.state.password}
            maxLength="254"
            onChange={this.handlePasswordChange.bind(this)}
            required
          />
        </div>
        <div>No account yet ? <button>Sign up !</button></div>
        <div>
          <input
            type="submit"
            value="Sign in"
          />
        </div>
      </form>
    )
  }
}
