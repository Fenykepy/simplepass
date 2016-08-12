import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { saveEjson } from 'public/ejson/actions'

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
        <div className="buttons-wrapper">
          <ExportButton
            saveEjson={this.saveEjson.bind(this)}
          />
        </div>
    )
  }
}

// wrap the component to inject dispatch and state into it
export default connect ()(ImportExportButtonsWrapper)




