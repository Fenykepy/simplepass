import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import {
  addBankCard,
  updateBankCard,
  deleteBankCard,
} from 'public/keychain/actions'


import Modal from 'public/modal/components/Modal'
import ModalContent from 'public/modal/components/ModalContent'
import ModalFooter from 'public/modal/components/ModalFooter'
import CardEditionForm from 'public/keychain/components/CardEditionForm'
import DeleteConfirm from 'public/keychain/components/DeleteConfirm'

const CARD_FORM = "bank-card-form"

class CardEdition extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      owner: '',
      number: '',
      expires_month: '--',
      expires_year: '--',
      cryptogram: '',
      description: '',
      errors: {},
    }
  }

  componentWillMount() {
    // we update existing card
    if (this.props.card) {
      let card = this.props.card
      // populate state with existing card
      this.setState({
        title: card.title || '',
        owner: card.owner || '',
        number: card.number || '',
        expires_month: card.expires_month || '',
        expires_year: card.expires_year || '',
        cryptogram: card.cryptogram || '',
        description: card.description || '',
      })
    }
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value})
  }

  handleOwnerChange(e) {
    this.setState({owner: e.target.value})
  }

  handleNumberChange(e) {
    this.setState({number: e.target.value})
  }

  handleExpiresMonthChange(e) {
    this.setState({expires_month: e.target.value})
  }

  handleExpiresYearChange(e) {
    this.setState({expires_year: e.target.value})
  }

  handleCryptogramChange(e) {
    this.setState({cryptogram: e.target.value})
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    let errors = this.validateForm()
    // we got errors
    if (Object.keys(errors).length > 0) {
      return this.setState({errors: errors})
    }
    // form is clean, submit it
    // we remove errors from state
    let card = {...this.state}
    delete card.errors
    if (this.props.card) {
      // we update an existing card
      card.id = this.props.card.id
      this.props.dispatch(updateBankCard(card))
    } else {
      // we create a new card
      this.props.dispatch(addBankCard(card))
    }
    // we close modal
    this.context.closeModal()
  }

  validateForm() {
    // title is required
    let errors = {}
    if (! this.state.title) {
      errors.title = [
        'This field is required.'
      ]
    }
    return errors
  }

  getDeleteButton() {
    if (! this.props.card) return null
    // we update existing card, show delete button
    return (
      <div className="delete">
        <button
          onClick={this.confirmDeleteCard.bind(this)}
        >Delete</button>
      </div>
    )
  }

  confirmDeleteCard() {
    let modal = (
      <Modal
        modal_closable={true}
        title="Delete a bank card"
      >
        <DeleteConfirm
          type="bank card"
          title={this.props.card.title}
          delete={this.deleteCard.bind(this)}
        />
      </Modal>
    )

    this.context.setModal(modal)
  }

  deleteCard() {
    this.props.dispatch(deleteBankCard(
      this.props.card.id
    )) 
    // we close modal
    this.context.closeModal()
  }

  render() {
    // injected by connect call
    const {
      dispatch,
    } = this.props

    //console.log('CardEdition', this.props)
    
    let value = this.props.card ?
      'Update bank card' :
        'Add bank card'

    return (
      <div>
        <ModalContent>
          {this.getDeleteButton()}
          <CardEditionForm
            id={CARD_FORM}
            onSubmit={this.handleSubmit.bind(this)}
            handleTitleChange={this.handleTitleChange.bind(this)}
            handleOwnerChange={this.handleOwnerChange.bind(this)}
            handleNumberChange={this.handleNumberChange.bind(this)}
            handleExpiresMonthChange={this.handleExpiresMonthChange.bind(this)}
            handleExpiresYearChange={this.handleExpiresYearChange.bind(this)}
            handleCryptogramChange={this.handleCryptogramChange.bind(this)}
            handleDescriptionChange={this.handleDescriptionChange.bind(this)}
            title={this.state.title}
            owner={this.state.owner}
            number={this.state.number}
            expires_month={this.state.expires_month}
            expires_year={this.state.expires_year}
            cryptogram={this.state.cryptogram}
            description={this.state.description}
            errors={this.state.errors}
          />
        </ModalContent>
        <ModalFooter>
          <button
            onClick={this.context.closeModal}
          >Cancel</button>
          <input
            type="submit"
            className="primary"
            form={CARD_FORM}
            value={value}
          />
        </ModalFooter>
      </div>
    )
  }
}

CardEdition.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
}

CardEdition.contextTypes = {
  setModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}
// wrap the component to inject dispatch and state into it
export default connect ()(CardEdition)
