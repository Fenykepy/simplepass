import React, { Component } from 'react'

import { connect } from 'react-redux'

import { appSelector } from 'public/app/selectors'

import Index from 'public/app/components/Index'
import Home from 'public/app/containers/Home'
import Spinner from 'public/app/components/Spinner'

class App extends Component {
  
  render () {

    // injected by connect call
    const {
      dispatch,
      user,
    } = this.props
    
    //console.log('App', this.props)
    
    // if user is authenticating, show spinner
    if (this.props.user.is_fetching) {
      return <Spinner message="Authenticating..." />
    }

    // if user is not authenticated and we have no children component
    if (! this.props.user.is_authenticated && ! this.props.children) {
      return <Index />
    }

    // if user is authenticated return Home
    if (this.props.user.is_authenticated) {
      return  (
        <Home
          children={this.props.children}
        />
      )
    }
    
    return this.props.children
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(appSelector)(App)
