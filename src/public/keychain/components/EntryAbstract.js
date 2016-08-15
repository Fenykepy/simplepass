import React, { Component, PropTypes } from 'react'

import PasswordDetail from 'public/keychain/components/PasswordDetail'
import NoteDetail from 'public/keychain/components/NoteDetail'
import CardDetail from 'public/keychain/components/CardDetail'


export default class EntryAbstract extends Component {

  constructor(props) {
    super(props)

    this.state = {
      details: false
    }
  }

  toogleDetails(e) {
    e.preventDefault()
    this.setState({details: ! this.state.details})
  }

  getDetails() {
    if (! this.state.details) return null
    switch(this.props.type) {
      case 'PASSWORD':
        return <PasswordDetail {...this.props} />
      case 'NOTE':
        return <NoteDetail {...this.props} />
      case 'BANK_CARD':
        return <CardDetail {...this.props} />
      default:
        return <NoteDetail {...this.props} />
    }
  }

  render() {
    //console.log('PasswordAbstract', this.props)
    return (
      <li><button
          className="entry"
          onClick={this.toogleDetails.bind(this)}
        >{this.props.title}</button>
        {this.getDetails()}
      </li>
    )
  }
}

EntryAbstract.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string, // in password
  email: PropTypes.string, // in password
  url: PropTypes.string, // in password
  description: PropTypes.string, // in password
  content: PropTypes.string, // in note
}
