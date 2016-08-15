import React, { Component, PropTypes } from 'react'

import HiddenCopyField from 'public/keychain/components/HiddenCopyField'
import AddNoteButton from 'public/keychain/components/AddNoteButton'


export default class NoteDetail extends Component {

  render() {
    //console.log('NoteDetail', this.props)
    return (

      <ul
        className="entry-detail"
      >
        <HiddenCopyField
          title="Note:"
          content={this.props.content}
        />
        <li>
          <AddNoteButton
            className="secondary small edit"
            note={this.props}
          >Edit</AddNoteButton>
        </li>
      </ul>
    )
  }
}

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
}
