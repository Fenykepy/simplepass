import React, { Component, PropTypes } from 'react'

import HiddenCopyField from 'public/keychain/components/HiddenCopyField'
import UrlField from 'public/keychain/components/UrlField'


export default class PasswordDetail extends Component {

  getDescription() {
    if (this.props.description) {
      return <tr><th>Description:</th><td> {this.props.description}</td></tr>
    }
    return null
  }

  render() {
    console.log('PasswordDetail', this.props)
    return (

      <div
        className="entry-detail"
      >
        <table>
          <tbody>
            <HiddenCopyField
              title="Username:"
              content={this.props.username}
            />
            <HiddenCopyField
              title="Email:"
              content={this.props.email}
            />
            <HiddenCopyField
              title="Password:"
              content={this.props.password}
            />
            <UrlField
              title="Related url:"
              url={this.props.url}
            />
            {this.getDescription()}
          </tbody>
        </table>
        <div
          className="footer"
        >
          <button
            className="secondary small edit"
          >Edit</button>
        </div>
      </div>
    )
  }
}
