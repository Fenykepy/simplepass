import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { saveEjson } from 'public/ejson/actions'

import ButtonsWrapper from 'public/form/buttonsWrapper/ButtonsWrapper'
import ExportButton from 'public/keychain/components/ExportButton'
//import ImportButton from '../components/ImportButton'

class ImportExportButtonsWrapper extends Component {

  saveEjson() {
    this.props.dispatch(saveEjson())
  }

  render() {
    // injected by connect call
    const {
      dispatch,
    } = this.props

    return (
        <ButtonsWrapper>
          <ExportButton
            saveEjson={this.saveEjson.bind(this)}
          />
        </ButtonsWrapper>
    )
  }
}

// wrap the component to inject dispatch and state into it
export default connect ()(ImportExportButtonsWrapper)




