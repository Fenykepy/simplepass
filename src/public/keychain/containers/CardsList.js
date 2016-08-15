import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { cardsSelector } from 'public/keychain/selectors'

import EntryAbstract from 'public/keychain/components/EntryAbstract'

class CardsList extends Component {

  render() {

    // injected by connect call
    const {
      dispatch,
      cards,
    } = this.props
    
    //console.log('PasswordsList', this.props)

    return (
      <ul>
        {this.props.cards.map(card =>
          <EntryAbstract
            key={card.id}
            {...card}
          />
        )}
      </ul>
    )
  }
}

CardsList.propTypes = {
  cards: PropTypes.array.isRequired,
}



// wrap the component to inject dispatch and state into it
export default connect (cardsSelector)(CardsList)
