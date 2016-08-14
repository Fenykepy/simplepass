import React, { Component, PropTypes } from 'react'

export default class UrlField extends Component {

  render() {
    return(
      <tr>
        <th>{this.props.title}</th>
        <td colSpan="3"><a
            target="_blank"
            href={this.props.url}
          >{this.props.url}</a>
        </td>
      </tr>  
    )
  }
}

