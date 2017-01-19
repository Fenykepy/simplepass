import React, { Component, PropTypes } from 'react'
import styles from './passwordStrengthIndicator.less'
const MAX = 320

export default class PasswordStrengthIndicator extends Component {

  getStrength(password) {
    // returns number of bits in password
    return (encodeURI(password).split(/%..|./).length - 1) * 8
  }
  getBarLength(strength) {
    // return value bar length, in %
    if (strength >= MAX) return 100
      return 100 * strength / MAX
  }

  render() {

    let strength = this.getStrength(this.props.password)
    let bar_length = this.getBarLength(strength)
    // we don't use <meter /> or <progress />
    // because it's impossible to have consistent style accross browsers
    return (
      <div>
        <div
          className={styles.indicator}
          title={strength + ' bits'}
        >
          <div
            className={styles.bar}
            style={{
              width: bar_length + '%',
            }}
          />
        </div>
        <div className={styles.legend}>
          <span>Weak</span>
          <span>Strong</span>
        </div>
      </div>
    )
  }
}

PasswordStrengthIndicator.propTypes = {
  password: PropTypes.string,
}
