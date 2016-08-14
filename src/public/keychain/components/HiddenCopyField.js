import React, { Component, PropTypes } from 'react'

export default class HiddenCopyField extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hidden: true
    }
  }

  toogleVisibility() {
    this.setState({hidden: ! this.state.hidden})
  }

  copyToClipboard() {
    try {
      // we populate hidden input with content
      this.copyInput.value = this.props.content
      // we select hidden input content
      this.copyInput.select()
      // we copy content to clipboard
      document.execCommand('copy')
      // we empty hidden input
      this.copyInput.value = ''
    }
    catch(e) {
      console.warn('Your browser doesn\'t support copying to clipboard.')
    }
  }

  getContent() {
    if (this.state.hidden) {
      // content is hidden
      return "•••••••••••"
    }
    // content is visible
    return this.props.content
  }

  render() {
    // we don't show field with no content
    if (! this.props.content) return null

    return (
      <li className="detail-row">
        <h6>{this.props.title}</h6>
        <div className="content">{this.getContent()}</div>
          <button
            className={this.state.hidden ? 'eye-hidden' : 'eye-visible'}
            title="Toogle content visibility"
            onClick={this.toogleVisibility.bind(this)}
          >
            <span className="accessibility">Toogle visibility</span>
          </button>
          {/* we create an false hidden input
              to be able to copy it's content to clipboard :
              copying directly a string doesn't work :/
              copying from real hidden input doesn't work too
              copying from display none input doesn't work ever
              so we set opacity to 0
            */}
          <input
            type="text"
            style={{'opacity': '0', 'position': 'fixed', 'top': '-1000000px', 'left': '-10000000px'}}
            ref={ref => this.copyInput = ref }
          />
          <button
            className="copy-to-clipboard"
            title="Copy content to clipboard"
            onClick={this.copyToClipboard.bind(this)}
          >
            <span className="accessibility">Copy to clipboard</span>
          </button>
      </li>
    )
  }
}


