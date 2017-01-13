import React, { Component, PropTypes } from 'react'

import Modal from 'public/modal/components/modal/Modal'
import PassphraseEdition from 'public/app/containers/PassphraseEdition'

export default class PassphraseEditionButton extends Component {

  setModal(e) {
    e.preventDefault()
    let modal = (
      <Modal
        modal_small={true}
        modal_closable={true}
        title="Change master passphrase"
      >
        <PassphraseEdition />
      </Modal>
    )

    this.context.setModal(modal)
  }

  render() {
    //console.log('PassphraseEditionButton', this.props)
    return (
      <a
        href=""
        onClick={this.setModal.bind(this)}
      >Change master passphrase</a>
    )
  }
}


PassphraseEditionButton.contextTypes = {
  setModal: PropTypes.func.isRequired,
}

