import React, { Component, PropTypes } from 'react'


import FormFieldErrors from 'public/app/components/FormFieldErrors'


export default class PassphraseEditionForm extends Component {

  render() {
    //console.log('PassphraseEditionForm', this.props)

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
          <label htmlFor="id-old_pass">Current master passphrase:</label>
          <FormFieldErrors
            errors_list={this.props.errors}
            field={'old_pass'}
          />
          <input id="id-old_pass"
            name="old_pass"
            type="password"
            value={this.props.old_pass}
            onChange={this.props.handleOldPassChange.bind(this)}
            required
          />
        </div>
        <div className="field-wrapper">
          <label htmlFor="id-pass">New master passphrase:</label>
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
          <label htmlFor="id-pass-confirm">New master passphrase confirmation:</label>
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


PassphraseEditionForm.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  old_pass: PropTypes.string.isRequired,
  handleOldPassChange: PropTypes.func.isRequired,
  pass: PropTypes.string.isRequired,
  handlePassChange: PropTypes.func.isRequired,
  pass_confirm: PropTypes.string.isRequired,
  handlePassConfirmChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}
