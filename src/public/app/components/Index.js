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
        <section id="intro">
          <h1>Synched keychain, secured, anywhere</h1>
          <p>Simple pass stores your passwords, private notes and bank cards informations. It allows you to retrieve them frow any modern browser, wherever you are. Only one master passphrase to remember gives you access to all the keychain.</p>
        </section>
        <section id="features">
          <article id="secure">
            <h1>Secure</h1>
            <p>Keychain is stored encrypted on the server<br />Encryption / decryption phases run in browser<br />No data leak</p>
          </article>
          <article id="devices">
            <h1>Multi devices</h1>
            <p>Runs in any modern browser supporting WebCrypto<br />You can access your keychain from any device<br />Desktop computers, laptops, tablets, phones...</p>
          </article>
          <article id="open">
            <h1>Open Source</h1>
            <p>Feel free to read code and submit pull requests<br />Run it on your own server</p>
          </article>
        </section>
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
