import React, { Component } from 'react'

import Link from 'react-router/lib/Link'

import Header from 'public/app/components/Header'

export default class Index extends Component {

  render() {
    return (
      <section id="index">
        <div id="main-title">
          <Header />
          <div className="text-wrapper">
            <h1>SimplePass</h1>
            <h2>A simple password manager</h2>
            <Link
              className="reversed"
              to={'/signup/'}
              role="button"
            >Get started</Link>
          </div>
        </div>
        <div id="intro">
          <h1>Synched keychain, secured, anywhere</h1>
          <p>Simple pass stores your passwords, private notes and bank cards informations. It allows you to retrieve them frow any browser, wherever you are. Only one master passphrase to remember gives you access to all the keychain.</p>
        </div>
        <div id="secure">
          <h1>Secure</h1>
          <p>Keychain is stored encrypted on the server<br />Encryption / decryption phases run in your browser<br />No data leak</p>
        </div>
        <div id="start">
          <p>Create an account and set your masterpassphrase</p>
          <Link
            className="primary"
            to={'/signup/'}
            role="button"
          >Get started</Link>
        </div>
        <footer role="content-info">
          <div className="content-wrapper">
            <ul className="footer-links">
              <li
                  className="github"
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
