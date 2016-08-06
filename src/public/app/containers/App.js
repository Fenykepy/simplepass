import React, { Component } from 'react'

import { connect } from 'react-redux'

import { arrayContains } from '../../../utils/helpers'

import {
  LOGIN,
  REGISTER,
  HOME,
  AUTH_FREE_STATES,
} from '../states'

import { appSelector } from '../selectors'

import { setState } from '../actions'

import Spinner from '../components/Spinner'
import Login from '../../user/containers/Login'
import Register from '../../user/containers/Register'

class App extends Component {
  
  render () {
    // injected by connect call
    const {
      dispatch,
      state,
      user,
    } = this.props

    // if user is authenticating, show spinner
    if (this.props.user.is_fetching) {
      return <Spinner message="Authenticating..." />
    }

    // if user is not authenticated and state is not in authentication free states
    // redirect to login state
    if (! this.props.user.is_authenticated && 
        ! arrayContains(this.props.state, AUTH_FREE_STATES)) {
      this.props.dispatch(setState(LOGIN))
      return (<Login />)
    }
    
    switch (this.props.state) {
      case LOGIN:
        return (<Login />)
      case REGISTER:
        return (<Register />)
      default:
        return (<div />)
    }
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(appSelector)(App)
