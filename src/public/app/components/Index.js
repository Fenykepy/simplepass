import React, { Component } from 'react'

import { Link } from 'react-router'

export default class Index extends Component {
  render() {
    return (
      <section>
        <header>
          <h1>SimplePass</h1>
          <h2>A simple password manager</h2>
          <Link to={'/login/'}>Log in</Link>
          <Link to={'/signup/'}>Sign up</Link>
        </header>
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
