//@flow

import {keys} from 'lodash'

import type Character from 'Game/Type/Character'

import Bar from 'Game/UI/Components/Bar'

import React from 'react'

type Props = {character:Character}

export default class CharacterRow extends React.Component {
  props: Props
  render() {
    // let key = "char"+this.props.character.id;
    let skills = []
    keys(this.props.character.skills).forEach((key) => {
      let skill = this.props.character.skills[key];
      // skills.push(<div>{key}-{skill}</div>);
      skills.push(<Bar text={key} percent={skill} />)
    })
    return <div className="character row">
      {this.props.character.toString()}
      {skills}
    </div>
  }
}
