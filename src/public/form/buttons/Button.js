import React, { Component, PropTypes } from 'react'

import styles from './button.less'

export default class Button extends Component {

  getClassNames() {
    let classes = []
    
    classes.push(this.props.className || styles.default)
    if (this.props.max) classes.push(styles.max)

    return classes.join(" ")
  }

  render() {
    return (
      <button
        className={this.getClassNames()}
        onClick={this.props.onClick}
        type="button"
      >{this.props.children}</button>
    )
  }
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  max: PropTypes.bool,
}
