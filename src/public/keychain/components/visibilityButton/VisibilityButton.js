import React, { Component, PropTypes } from 'react'

import styles from './visibilityButton.less'

import AccessibilityText from 'public/app/components/accessibilityText/AccessibilityText'


export default class VisibilityButton extends Component {

  getClasses() {
    let classes = this.props.hidden ? styles.hidden : styles.visible

    // add extra classes
    if (this.props.styles) {
      classes = classes + " " + this.props.styles
    }
    return classes
  }

  render () {
    return (
      <button
        type="button"
        className={this.getClasses()}
        title="Toogle content visibility"
        onClick={this.props.toogleVisibility.bind(this)}
      >
        <AccessibilityText
          text="Toogle content visibility"
        />
      </button>
    )
  }
}

VisibilityButton.propTypes = {
  hidden: PropTypes.bool.isRequired,
  toogleVisibility: PropTypes.func.isRequired,
}
