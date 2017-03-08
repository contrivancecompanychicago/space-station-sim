// @flow


import { connect } from 'react-redux';
import React from 'react';

import Draggable from 'react-draggable'

import Character from 'Game/Type/Character'

import CharacterRow from 'Game/UI/Row/Character'

import Header from './Component/Header'

import state from 'Game/state'

class HiringPanel extends React.Component {


  componentDidMount(){
    setTimeout(() => {
      this.forceUpdate(); //HACK because char not inited at mount
    }, 100)
  }

  render() {
    const charManager = state.character

    let chars = []
    if(state.character){
      state.character.getHireableChars().forEach((c) => {
        let hire = (e) => {
          c.type = 'WORKER'
          state.character.hireCharacter(c)
          this.forceUpdate()
        }
        // let hireCook = (e) => {
        //   c.type = 'COOK'
        //   state.character.hireCharacter(c)
        //   this.forceUpdate()
        // }
        let row = <div className="hireable" key={c.id}>
          <CharacterRow character={c} />
          <div className="salary">${c.salary} per week</div>
          <button onClick={hire}>hire</button>
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

function mapStateToProps(state:Object, props:Object):Object {
  return {
  };
}

function mapDispatchToProps(dispatch:Function, props:Object):Object {
  return {
    close: () => {
      dispatch({type:'TOGGLE_HIRING_PANEL'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HiringPanel);
