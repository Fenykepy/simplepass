import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { notesSelector } from 'public/keychain/selectors'

import EntryAbstract from 'public/keychain/components/EntryAbstract'

class NotesList extends Component {

  render() {

    // injected by connect call
    const {
      dispatch,
      notes,
    } = this.props
    
    //console.log('NotesList', this.props)

    return (
      <ul>
        {this.props.notes.map(note =>
          <EntryAbstract
            key={note.id}
            {...note}
          />
        )}
      </ul>
    )
  }
}

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
}

// wrap the component to inject dispatch and state into it
export default connect (notesSelector)(NotesList)
