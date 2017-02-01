// @flow
import {getCharacterManager} from 'Game/engine';

import { connect } from 'react-redux';
import React from 'react';

import Draggable from 'react-draggable'

import Character from 'Game/Type/Character'

import CharacterRow from 'Game/UI/Row/Character'

class HiringPanel extends React.Component {

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
      <h3 onClick={this.props.close}>Hiring Panel</h3>
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
      console.log("asd");
      dispatch({type:'TOGGLE_HIRING_PANEL'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HiringPanel);
