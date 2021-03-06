import React, { Component, PropTypes } from 'react'

export default class UrlField extends Component {

  render() {
    // we don't show field with no content
    if (! this.props.url) return null

    return(
      <li className="detail-row">
        <h6>{this.props.title}</h6>
        <div className="content"><a
            target="_blank"
            href={this.props.url}
          >{this.props.url}</a>
        </div>
      </li>  
    )
  }
}

