import React, { Component, PropTypes } from 'react'

import Modal from 'public/modal/components/Modal'
import PasswordEdition from 'public/keychain/containers/PasswordEdition'

export default class AddPasswordButton extends Component {

  setModal() {
    let modal = (
      <Modal
        closeModal={this.context.closeModal}
        title={this.getTitle()}
      >
        <PasswordEdition
          closeModal={this.context.closeModal}
          password={this.props.password}
          setModal={this.context.setModal}
        />
      </Modal>
    )

    this.context.setModal(modal)
  }

  getTitle() {
    if (this.props.password) {
      // we update existing password
      return "Edit password"
    }
    // we add a new password
    return "Add a new password"
  }

  render() {
    //console.log('AddEntryButton', this.props)
    return (
      <button
        className={this.props.className || "secondary"}
        onClick={this.setModal.bind(this)}
      >{this.props.children}</button>
    )
  }
}

AddPasswordButton.contextTypes = {
  setModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

AddPasswordButton.PropTypes = {
  password: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
}
