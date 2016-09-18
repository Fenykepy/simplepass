import React, { Component } from 'react'

import { setDocumentTitle } from 'public/app/actions'

import Header from 'public/app/components/header/Header'

import Button from 'public/form/buttons/Button'
import LinkButton from 'public/form/buttons/LinkButton'

import styles from './index.less'

export default class Index extends Component {

  componentDidMount() {
    // we set title
    setDocumentTitle()
  }

  render() {
    return (
      <section>
        <div
          id="about"
          className={styles.about}
        >
          <Header />
          <div
            className={styles.textWrapper}
          >
            <h1>SimplePass</h1>
            <h2>A simple password manager</h2>
            <LinkButton
              reversed={true}
              to={'/signup/'}
              big={true}
            >Get started</LinkButton>
          </div>
        </div>
        <section
          id="intro"
          className={styles.intro}
        >
          <h1>Synched keychain, secured, anywhere</h1>
          <p>Simple pass stores your passwords, private notes and bank cards informations. It allows you to retrieve them frow any modern browser, wherever you are. Only one master passphrase to remember gives you access to all the keychain.</p>
        </section>
        <section
          id="features"
          className={styles.features}
        >
          <article
            id="secure"
            className={styles.secure}
          >
            <h1>Secure</h1>
            <p>Keychain is stored encrypted on the server<br />Encryption / decryption phases run in browser<br />No data leak</p>
          </article>
          <article
            id="devices"
            className={styles.devices}
          >
            <h1>Multi devices</h1>
            <p>Runs in any modern browser supporting WebCrypto<br />You can access your keychain from any device<br />Desktop computers, laptops, tablets, phones...</p>
          </article>
          <article
            id="open"
            className={styles.open}
          >
            <h1>Open Source</h1>
            <p>Feel free to read code and submit pull requests<br />Run it on your own server</p>
          </article>
        </section>
        <div
          id="start"
          className={styles.start}
        >
          <p>Create an account and set your masterpassphrase</p>
          <LinkButton
            to={'/signup/'}
            primary={true}
            big={true}
          >Get started</LinkButton>
        </div>
        <footer
          role="content-info"
          className={styles.footer}
        >
          <div className={styles.footerWrapper}>
            <ul className={styles.footerLinks}>
              <li
                  className={styles.github}
              ><a
                  target="_blank"
                  href="https://github.com/Fenykepy/simplepass"
                >GitHub</a></li>
            </ul>
            <p>Designed and built with love by <a href="https://github.com/Fenykepy">@Fenykepy</a>.</p>
            <p>Code licensed <a href="https://github.com/Fenykepy/simplepass/blob/master/LICENSE">GPLv3</a>.</p>
          </div>
        </footer>
      </section>
    )
  }
}
