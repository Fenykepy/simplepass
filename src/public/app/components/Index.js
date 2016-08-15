import React, { Component } from 'react'

import Link from 'react-router/lib/Link'

import Header from 'public/app/components/Header'

export default class Index extends Component {

  render() {
    return (
      <section>
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
          <h1>You're keychain in sync, everywhere</h1>
          <p>Simple pass store your passwords, secure notes and bank cards informations and allows you to retrieve them from any browser.</p>
        </div>
        <div id="secure">
          <h1>Secure</h1>

        </div>
          <article>
            <h1>One word, to manage them all</h1>
            <p>You only need to remember your "master" password to get access to all your passwords and notes</p>
          </article>
          <article>
            <h1>Your data are safe</h1>
            <p>All your passwords and notes are stored in an encrypted file on the server.</p>
            <p>Under no way the server can have access to your data</p>
            <p>Content will be delivered only through a secure connection</p>
          </article>
          <article>
            <h1>Keep your data in sync</h1>
            <p>You can retrieve your password and notes from any browser</p>
          </article>
          <article>
            <h1>Open source</h1>
            <p>If you have any doubts, feel free to read the code, and run it on your own server</p>
          </article>
        <footer>
        </footer>
      </section>
    )
  }
}
