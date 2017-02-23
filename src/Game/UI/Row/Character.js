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
    if( this.props.character.type !== 'CUSTOMER'){
      Object.keys(this.props.character.skills).forEach((key) => {
        let skill = this.props.character.skills[key];
        // skills.push(<div>{key}-{skill}</div>);
        skills.push(<Bar key={key} text={key} percent={skill} />)
      })

    }
    
    return <div className="character row">
      <div className="name">{this.props.character.toString()}</div>
      <div className="type">{this.props.character.type}</div>
      <div className="skills">
        {skills}
      </div>
    </div>
  }
}
