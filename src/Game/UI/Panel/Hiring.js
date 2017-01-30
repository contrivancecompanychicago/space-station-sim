// @flow
import {getCharacterManager} from 'Game/engine';

import React from 'react';

import Draggable from 'react-draggable'

import Character from 'Game/Type/Character'

import CharacterRow from 'Game/UI/Row/Character'

export default class HiringPanel extends React.Component {

  render() {
    const charManager = getCharacterManager();

    let chars = []
    if(charManager){
      charManager.getHireableChars().forEach((c) => {
        let click = (e) => {
          console.log("hire", c.toString());
        }
        let row = <div key={c.id}>
          <CharacterRow character={c} />
          <button onClick={click}>hire</button>
        </div>

        chars.push(row)
      })
    }

    return <Draggable><div className="hiring panel">
      <h3>Hiring Panel</h3>
      {chars}
    </div></Draggable>

  }

}
