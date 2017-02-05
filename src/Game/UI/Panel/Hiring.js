// @flow
import {getCharacterManager} from 'Game/engine';

import { connect } from 'react-redux';
import React from 'react';

import Draggable from 'react-draggable'

import Character from 'Game/Type/Character'

import CharacterRow from 'Game/UI/Row/Character'

import Header from './Component/Header'

class HiringPanel extends React.Component {


  render() {
    const charManager = getCharacterManager();

    let chars = []
    if(charManager){
      charManager.getHireableChars().forEach((c) => {
        let hireWaiter = (e) => {
          console.log("hire", c.toString());
          c.type = 'WAITER'
          charManager.spawnCharacter(c)
          charManager.generateHireableChars();
          this.forceUpdate()
        }
        let hireCook = (e) => {
          console.log("hire", c.toString());
          c.type = 'COOK'
          charManager.spawnCharacter(c)
          charManager.generateHireableChars();
          this.forceUpdate()
        }
        let row = <div key={c.id}>
          <CharacterRow character={c} />
          <button onClick={hireWaiter}>hire waiter</button>
          <button onClick={hireCook}>hire cook</button>
        </div>

        chars.push(row)
      })
    }

    return <Draggable><div className="hiring panel">
      <Header text='Hiring Panel' close={this.props.close} />
      {chars}
    </div></Draggable>

  }

}

function mapStateToProps(state, props) {
  return {
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    close: () => {
      dispatch({type:'TOGGLE_HIRING_PANEL'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HiringPanel);
