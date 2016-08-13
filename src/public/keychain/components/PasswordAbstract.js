import React, { Component, PropTypes } from 'react'

import PasswordDetail from 'public/keychain/components/PasswordDetail'


export default class PasswordAbstract extends Component {

  constructor(props) {
    super(props)

    this.state = {
      details: false
    }
  }

  toogleDetails(e) {
    e.preventDefault()
    console.log('clicked !')
    this.setState({details: ! this.state.details})
  }

  render() {
    //console.log('PasswordAbstract', this.props)
    return (
      <li><button
          className="entry"
          onClick={this.toogleDetails.bind(this)}
        >{this.props.title}</button>
        {this.state.details ? 
          <PasswordDetail {...this.props} /> : null
        }
      </li>
    )
  }
}
