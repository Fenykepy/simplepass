import React, { Component, PropTypes } from 'react'

import spinner_svg from 'graphics/svg/spinner.svg'
/*
 * using a svg spinner optimized with svgo rotating with css3
 * we pass from 8kb to 4kb
 */
export default class Spinner extends Component {
  render() {

    return (
      <div className="spinner">
          <img src={spinner_svg} alt="spinner" height="40px"/>
        <p><em>{this.props.message}</em></p>
      </div>
    )
  }
}

