// @flow
import {getCharacterManager} from 'Game/engine';

import React from 'react';

import Draggable from 'react-draggable'

import Character from 'Game/Type/Character'

import CharacterRow from 'Game/UI/Row/Character'

export default class HiringPanel extends React.Component {



  render() {
    const charManager = getCharacterManager();

    let char = new Character();

    return <Draggable><div className="hiring panel">
      <h3>Hiring Panel</h3>
      <CharacterRow character={char} />
    </div></Draggable>

  }

}
