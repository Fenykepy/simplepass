import React, { Component, PropTypes } from 'react'


import FormFieldErrors from '../../app/components/FormFieldErrors'


export default class MasterPassphraseForm extends Component {

  render() {
    console.log('MasterPassphraseForm', this.props)

    return (
      <form
        id={this.props.id}
      >
        <div className="field-wrapper">
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'non_field_errors'}
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-pass">Master passphrase:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'pass'}
          />
          <input id="id-pass"
            name="pass"
            type="password"
            value={this.props.pass}
            onChange={this.props.handlePassChange.bind(this)}
            required
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-pass-confirm">Master passphrase confirmation:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'pass_confirm'}
          />
          <input id="id-pass-confirm"
            name="pass_confirm"
            type="password"
            value={this.props.pass_confirm}
            onChange={this.props.handlePassConfirmChange.bind(this)}
            required
          />
        </div>
      </form>
    )
  }
}

