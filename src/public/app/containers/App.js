import React, { Component } from 'react'

import { connect } from 'react-redux'

import { appSelector } from '../selectors'

import Index from '../components/Index'
import Home from './Home'
import Spinner from '../components/Spinner'

class App extends Component {
  
  render () {
    // injected by connect call
    const {
      dispatch,
      user,
    } = this.props
    
    // if user is authenticating, show spinner
    if (this.props.user.is_fetching) {
      return <Spinner message="Authenticating..." />
    }

    // if user is not authenticated and we have no children component
    if (! this.props.user.is_authenticated && ! this.props.children) {
      return <Index />
    }

    // if user is authenticated and we have no children component
    if (this.props.user.is_authenticated && ! this.props.children) {
      return <Home />
    }
    
    return this.props.children
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(appSelector)(App)
