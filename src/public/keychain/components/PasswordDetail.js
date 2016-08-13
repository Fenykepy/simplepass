import React, { Component, PropTypes } from 'react'


export default class PasswordDetail extends Component {

  getUsername() {
    if (this.props.username) {
      return <li><strong>Username:</strong> {this.props.username}</li>
    }
    return null
  }

  getEmail() {
    if (this.props.email) {
      return <li><strong>Email:</strong> {this.props.email}</li>
    }
    return null
  }

  getPassword() {
    if (this.props.password) {
      return <li><strong>Password:</strong> {this.props.password}</li>
    }
    return null
  }

  getUrl() {
    if (this.props.url) {
      return <li><strong>Related url:</strong> <a
          href={this.props.url}>{this.props.url}</a></li>
    }
    return null
  }

  getDescription() {
    if (this.props.password) {
      return <li><strong>Description:</strong> {this.props.description}</li>
    }
    return null
  }

  render() {
    console.log('PasswordDetail', this.props)
    return (
      <ul
        className="entry-detail"
      >
        {this.getUsername()}
        {this.getEmail()}
        {this.getPassword()}
        {this.getUrl()}
        {this.getDescription()}
        
      </ul>
    )
  }
}
