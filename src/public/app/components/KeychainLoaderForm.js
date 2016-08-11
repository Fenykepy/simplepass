import React, { Component, PropTypes } from 'react'


import FormFieldErrors from '../../app/components/FormFieldErrors'


export default class KeychainLoaderForm extends Component {

  render() {
    //console.log('KeychainLoaderForm', this.props)


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
      </form>
    )
  }
}


