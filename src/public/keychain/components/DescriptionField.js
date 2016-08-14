import React, { Component, PropTypes } from 'react'

export default class DescriptionField extends Component {

  render() {
    // we don't show field with no content
    if (! this.props.content) return null

    return(
      <li className="detail-row">
        <h6>{this.props.title}</h6>
        <div className="content">
          {this.props.content}
        </div>
      </li>  
    )
  }
}

