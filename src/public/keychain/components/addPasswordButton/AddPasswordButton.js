import React, { Component, PropTypes } from 'react'

import Modal from 'public/modal/components/modal/Modal'
import PasswordEdition from '../..//containers/passwordEdition/PasswordEdition'

export default class AddPasswordButton extends Component {

  setModal() {
    let modal = (
      <Modal
        modal_closable={true}
        title={this.getTitle()}
      >
        <PasswordEdition
          password={this.props.password}
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
        className={this.props.className || ""}
        onClick={this.setModal.bind(this)}
      >{this.props.children}</button>
    )
  }
}

AddPasswordButton.contextTypes = {
  setModal: PropTypes.func.isRequired,
}

AddPasswordButton.PropTypes = {
  password: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
}
