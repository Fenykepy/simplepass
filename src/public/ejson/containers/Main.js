import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

//import { ejsonSelector } from '../selectors'

import { setDocumentTitle } from '../../app/actions'

import Spinner from '../../app/components/Spinner'

class Main extends Component {

  render() {
    return (<div>User successfully authenticated</div>)
  }
}

// wrap the component to inject dispatch and state into it
export default connect ((state) => state)(Register)
