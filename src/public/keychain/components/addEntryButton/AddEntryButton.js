import React, { Component, PropTypes } from 'react'

import Modal from 'public/modal/components/modal/Modal'
import Button from 'public/form/buttons/Button'
import AddPasswordButton from 'public/keychain/components/AddPasswordButton'
import AddNoteButton from 'public/keychain/components/AddNoteButton'
import AddCardButton from 'public/keychain/components/AddCardButton'

import styles from './addEntryButton.less'

export default class AddEntryButton extends Component {

  setModal() {
    let modal = (
      <Modal
        modal_closable={true}
        title="Add a new"
      >
        <footer
          className={styles.adjoinedButtonsWrapper}
        >
          <AddPasswordButton>Password</AddPasswordButton>
          <AddNoteButton>Note</AddNoteButton>
          <AddCardButton>Bank card</AddCardButton>
        </footer>
      </Modal>
    )

    this.context.setModal(modal)
  }

  render() {
    //console.log('AddEntryButton', this.props)
    return (
      <Button
        secondary={true}
        shy={true}
        onClick={this.setModal.bind(this)}
      >{this.props.children}</Button>
    )
  }
}

AddEntryButton.contextTypes = {
  setModal: PropTypes.func.isRequired,
}

AddEntryButton.propTypes = {
  className: PropTypes.string,
}
