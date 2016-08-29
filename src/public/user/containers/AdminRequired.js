import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

export default function AdminRequired(Child) {

  class AdminComponent extends Component {

    componentWillMount() {
      this.checkAdmin(this.props)
    }

    componentWillReceiveProps(nextProps) {
      this.checkAdmin(nextProps)
    }

    checkAdmin(props) {
      if (! props.is_authenticated) {
        let next = props.location.pathname
        return this.context.router.push(`/login/?next=${next}`)
      }
      if (! props.is_admin) {
        // TODO add a 403 page
        return null
      }
    }

    render() {
      const {
        is_authenticated,
        is_admin,
      } = this.props

      return <Child {...this.props} />
    }
  }

  AdminComponent.contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  const mapStateToProps = state => {
    return {
      is_authenticated: state.user.is_authenticated,
      is_admin: state.user.admin,
    }
  }

  // Wrap the component to inject dispatch and state into it
  return connect(mapStateToProps)(AdminComponent)
}

