import React, { Component, PropTypes } from 'react'

import HiddenCopyField from 'public/keychain/components/HiddenCopyField'
import UrlField from 'public/keychain/components/UrlField'
import DescriptionField from 'public/keychain/components/DescriptionField'
import AddEntryButton from 'public/keychain/components/AddEntryButton'


export default class PasswordDetail extends Component {

  getDescription() {
    if (this.props.description) {
      return <li><h6>Description:</h6><div>{this.props.description}</div></li>
    }
    return null
  }

  render() {
    //console.log('PasswordDetail', this.props)
    return (

      <ul
        className="entry-detail"
      >
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
        <DescriptionField
          title="Description:"
          content={this.props.description}
        />
        <li>
          <AddEntryButton
            className="secondary small edit"
            password={this.props}
          >Edit</AddEntryButton>
        </li>
      </ul>
    )
  }
}
