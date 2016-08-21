import React, { Component } from 'react'

import Link from 'react-router/lib/Link'
import PassphraseEditionButton from 'public/app/components/PassphraseEditionButton'

export default class UserMenu extends Component {

  render() {
    return (
      <div>
        <div id="overlay" className="transparent"
          onClick={this.props.close}
        />
        <ul className="dropdown-menu">
          <li><PassphraseEditionButton /></li>
          <li><a
              href=""
              onClick={this.props.logout}
          >Logout</a></li>
        </ul>
      </div>
    )
  }
}
