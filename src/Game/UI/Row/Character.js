//@flow
import React from 'react'

export default class CharacterRow extends React.Component {
  render() {
    return <div className="character row">
      {this.props.character.toString()}
    </div>
  }
}
