import React, { Component, PropTypes } from 'react'

import Modal from 'public/modal/components/Modal'
import CardEdition from 'public/keychain/containers/CardEdition'

export default class AddCardButton extends Component {

  setModal() {
    let modal = (
      <Modal
        closeModal={this.context.closeModal}
        title={this.getTitle()}
      >
        <CardEdition
          closeModal={this.context.closeModal}
          card={this.props.card}
          setModal={this.context.setModal}
        />
      </Modal>
    )

    this.context.setModal(modal)
  }

  getTitle() {
    if (this.props.card) {
      // we update existing card
      return "Edit bank card"
    }
    // we add a new card
    return "Add a new bank card"
  }


  render() {
    //console.log('AddCardButton', this.props)
    return (
      <button
        className={this.props.className || "secondary"}
        onClick={this.setModal.bind(this)}
      >{this.props.children}</button>
    )
  }
}

AddCardButton.contextTypes = {
  setModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

AddCardButton.PropTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
}
