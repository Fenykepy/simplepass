import React, { Component, PropTypes } from 'react'

import HiddenCopyField from 'public/keychain/components/HiddenCopyField'
import DescriptionField from 'public/keychain/components/DescriptionField'
import AddCardButton from 'public/keychain/components/AddCardButton'


export default class CardDetail extends Component {

  render() {
    //console.log('CardDetail', this.props)
    return (

      <ul
        className="entry-detail"
      >
        <HiddenCopyField
          title="Card owner:"
          content={this.props.owner}
        />
        <HiddenCopyField
          title="Card number:"
          content={this.props.number}
        />
        <HiddenCopyField
          title="Expires at:"
          content={this.props.expires_month + "/" + 
          this.props.expires_year}
        />
        <HiddenCopyField
          title="Cryptogram:"
          content={this.props.cryptogram}
        />
        <DescriptionField
          title="Description:"
          content={this.props.description}
        />
        <li>
          <AddCardButton
            className="secondary small edit"
            card={this.props}
          >Edit</AddCardButton>
        </li>
      </ul>
    )
  }
}

CardDetail.propTypes = {
  title: PropTypes.string.isRequired,
  owner: PropTypes.string,
  number: PropTypes.string,
  expires_month: PropTypes.string,
  expires_year: PropTypes.string,
  cryptogram: PropTypes.string,
  description: PropTypes.string,
}
