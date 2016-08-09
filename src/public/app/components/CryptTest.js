import React, { Component } from 'react'

import FormFieldErrors from './FormFieldErrors'
import crypto from '../crypto'

export default class CryptTest extends Component {

  constructor(props) {
    super(props)

    this.state = {
      key: "Secret",
      input_clear_text: "This text will be encrypted.\nSome non ascii chars for pleasure: …œŒæÆŸж",
      output_ejson: "",
      input_ejson: "",
      output_clear_text: "",
      key_errors: {},
      clear_text_errors: {},
      ejson_errors: {},
    }
  }

  handleKeyChange(e) {
    this.setState({key: e.target.value})
  }

  handleEjsonChange(e) {
    this.setState({input_ejson: e.target.value})
  }

  handleTextChange(e) {
    this.setState({input_clear_text: e.target.value})
  }

  getEjson(e = null) {
    if (e) e.preventDefault()

    if (this.state.key && this.state.input_clear_text) {
      // form is ok, reset errors
      this.setState({key_errors: {}, clear_text_errors: {}})
      // we compute ejson
      crypto.string2ejson(
        this.state.input_clear_text,
        this.state.key
      ).then(ejson =>
        this.setState({
          output_ejson: ejson,
          input_ejson: this.state.input_ejson ?
            this.state.input_ejson :
              ejson
        })
      )
    }
    // we show errors if necessary
    if (! this.state.key) {
      this.setState({key_errors: {key: ['This field is required']}})
    }
    if (! this.state.input_clear_text) {
      this.setState({clear_text_errors: {clear_text: ['This field is required']}})
    }
  }

  getText(e) {
    if (e) e.preventDefault()

    if (this.state.key && this.state.input_ejson) {
      // form is ok, reset errors
      this.setState({key_errors: {}, ejson_errors: {}})
      // we compute clear text
      crypto.ejson2string(
        this.state.input_ejson,
        this.state.key
      ).then(text =>
        this.setState({ output_clear_text: text })
      )
    }
    // we show errors if necessary
    if (! this.state.key) {
      this.setState({key_errors: {key: ['This field is required']}})
    }
    if (! this.state.input_ejson) {
      this.setState({ejson_errors: {ejson: ['This field is required']}})
    }
  }

  render() {

    if (! window.crypto) {
      return <div><em>Sorry, your browser doen't support webCrypto, upgrade it.</em></div>
    }
    try {
      new TextEncoder('utf-8').encode('my_str')
    }
    catch (e) {
      return <div><em>Sorry, your browser doen't support TextEncoder, upgrade it.</em></div>
    }

    return (
      <article id="column-form">
        <h1>Ejson encryption sandbox</h1>
        <form>
          <div className="field-wrapper">
            <FormFieldErrors
              errors_list={this.state.key_errors}
              field={'key'}
            />
            <label htmlFor="id_key">Passphrase:</label>
            <input
              id="id_key"
              type="text"
              value={this.state.key}
              onChange={this.handleKeyChange.bind(this)}
            />
          </div>
          <div className="field-wrapper">
            <FormFieldErrors
              errors_list={this.state.clear_text_errors}
              field={'clear_text'}
            />
            <label htmlFor="id_text">Text to encrypt:</label>
            <textarea
              id="id_text"
              rows="5"
              value={this.state.input_clear_text}
              onChange={this.handleTextChange.bind(this)}
            />
          </div>
          <div className="field-wrapper">
            <label>Resulted Ejson:</label>
            <p className="ejson">{this.state.output_ejson}</p>
          </div>
          <div className="field-wrapper">
            <input
              className="primary max"
              value="Encrypt"
              type="submit"
              onClick={this.getEjson.bind(this)}
            />
          </div>
          <div className="field-wrapper">
            <FormFieldErrors
              errors_list={this.state.ejson_errors}
              field={'ejson'}
            />
            <label htmlFor="id_ejson">Ejson to decrypt:</label>
            <textarea
              id="id_ejson"
              rows="5"
              value={this.state.input_ejson}
              onChange={this.handleEjsonChange.bind(this)}
            />
          </div>
          <div className="field-wrapper">
            <label>Resulted text:</label>
            <p>{this.state.output_clear_text}</p>
          </div>
          <div className="field-wrapper">
            <input
              className="primary max"
              value="Decrypt"
              type="submit"
              onClick={this.getText.bind(this)}
            />
          </div>

        </form>
      </article>
    )
  }
}
