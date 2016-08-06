import React, { Component } from 'react'

import { connect } from 'react-redux'

import { arrayContains } from '../../../utils/helpers'

import {
  INDEX,
  LOGIN,
  REGISTER,
  HOME,
  MAIN,
  AUTH_FREE_STATES,
} from '../states'

import { appSelector } from '../selectors'

import { setState } from '../actions'

import Index from '../components/Index'
import Home from './Home'
import Spinner from '../components/Spinner'
import Login from '../../user/containers/Login'
import Register from '../../user/containers/Register'

class App extends Component {
  
  login(e) {
    e.preventDefault()
    this.props.dispatch(setState(LOGIN))
  }

  register(e) {
    e.preventDefault()
    this.props.dispatch(setState(REGISTER))
  }

  render () {
    // injected by connect call
    const {
      dispatch,
      state,
      user,
    } = this.props
    
    const index = (<Index
      login={this.login.bind(this)}
      register={this.register.bind(this)}
      />)
    // if user is authenticating, show spinner
    if (this.props.user.is_fetching) {
      return <Spinner message="Authenticating..." />
    }

    // if user is not authenticated and state is not in authentication free states
    // redirect to login state
    if (! this.props.user.is_authenticated && 
        ! arrayContains(this.props.state, AUTH_FREE_STATES)) {
      this.props.dispatch(setState(INDEX))
      return index
    }

    // if user is authenticated and no state, redirect to main
    if (this.props.user.is_authenticated && ! this.props.state) {
      this.props.dispatch(setState(HOME))
      return (<Home />)
    }
    
    switch (this.props.state) {
      case LOGIN:
        return (<Login />)
      case REGISTER:
        return (<Register />)
      case INDEX:
        return index
      case HOME:
        return (<Home />)
      default:
        return index
    }
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(appSelector)(App)
