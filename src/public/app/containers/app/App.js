import React, { Component, PropTypes } from 'react'

import favicon from 'graphics/favicon.png'

import { connect } from 'react-redux'

import { appSelector } from 'public/app/selectors'

import {
  closeModal,
  setModal,
} from 'public/modal/actions'

import Index from 'public/app/components/index/Index'
import Home from 'public/app/containers/Home'
import Spinner from 'public/app/components/Spinner'
import Header from 'public/app/components/header/Header'

import styles from './app.less'

class App extends Component {
  
  getChildContext() {
    // we set setModal and closeModal as context
    // to avoid passing it everywhere
    return {
      setModal: this.setModal.bind(this),
      closeModal: this.closeModal.bind(this),
    }
  }
  
  setModal(modal) {
    this.props.dispatch(setModal(modal))
  }

  closeModal() {
    this.props.dispatch(closeModal())
  }

  getChild() {
    /*
     * Returns children if any
     * else returns Home if user is authenticated 
     */
    if (this.props.children) { 
      return this.props.children
    }
    
    return <Home />
  }

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

    // if user isn't authenticated, and no children, show index
    // (we put it here and not in getChild() because it already includes
    // header
    if (! this.props.children && ! this.props.user.is_authenticated) {
      return <Index />
    }

    return (
      <section
        role="main"
        className={styles.main}
      >
        <Header
          authenticated={this.props.user.is_authenticated}
        />
        {this.getChild()}
      </section>
    )
  }
}

App.childContextTypes = {
  setModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    is_authenticated: PropTypes.bool,
    is_fetching: PropTypes.bool,
  }).isRequired
}

// Wrap the component to inject dispatch and state into it
export default connect(appSelector)(App)
