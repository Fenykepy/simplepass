import React, { Component, PropTypes } from 'react'

import Link from 'react-router/lib/Link'

export default class AdminLink extends Component {

  render() {
    return (
      <Link
        to="/admin/"
        className={this.props.className}
      >Admin</Link>
    )
  }
}

AdminLink.propTypes = {
  className: PropTypes.string,
}
