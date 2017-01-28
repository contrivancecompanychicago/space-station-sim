// @flow
import {getCharacterManager} from 'Game/engine';

import {values} from 'lodash'

import React from 'react';

import Draggable from 'react-draggable'

import type Character from 'Game/Type/Character'

export default class OrderPanel extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 1000)
  }
  render() {
    const characterManager = getCharacterManager();

    let staff = []
    if(characterManager){
      values(characterManager.state).forEach((o:Character, i) => {

        staff.push(
          <div className='order' key={'order'+i}>

            <div className='name'>{o.toString()}</div>
            <div className='type'>{o.type}</div>
          </div>)
      });
    }
    return <Draggable><div className="staff panel">
      <h3>Staff Panel</h3>
      {staff}
    </div></Draggable>

  }

}
