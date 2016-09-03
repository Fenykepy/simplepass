import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'


function AuthenticationRequired(Child) {

  class AuthenticationComponent extends Component {

    componentWillMount() {
      this.checkAuth(this.props)
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps)
    }

    checkAuth(props) {
      if (! props.is_authenticated) {
        let next = props.location.pathname
        this.context.router.push(`/login/?next=${next}`)
      }
    }
  
    getComponent() {
      if (this.props.is_authenticated) {
        return <Child {...this.props} />
      }
      return null
    }


    render() {
      const {
        is_authenticated,
      } = this.props

      // console.log('AuthenticationComponent', this.props)
      return this.getComponent()
    }
  }


  AuthenticationComponent.contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  const mapStateToProps = state => {
    return {is_authenticated: state.user.is_authenticated}
  }

  // Wrap the component to inject dispatch and state into it
  return connect(mapStateToProps)(AuthenticationComponent)
}

export default AuthenticationRequired
