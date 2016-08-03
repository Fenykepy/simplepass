import React, { Component } from 'react'
import { connect } from 'react-redux'
import { appSelector } from '../selectors'

class App extends Component {
  
  render () {
    // if user is not authenticated,
    // show login screen

    // else 
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(appSelector)(App)
