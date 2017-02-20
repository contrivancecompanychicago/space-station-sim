// @flow

import { connect } from 'react-redux';
import {values} from 'lodash'

import React from 'react';

import Draggable from 'react-draggable'
import Header from './Component/Header'

import type Character from 'Game/Type/Character'

import state from 'Game/state'

class StaffPanel extends React.Component {

  interval:number;
  componentDidMount() {
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    const characterManager = state.character

    let staff = []
    if(characterManager){
      values(characterManager.state).forEach((o:Character, i) => {
        if(o.type !== 'CUSTOMER'){
          staff.push(
            <div className='order' key={'order'+i}>
            <div className='name'>{o.toString()}</div>
            <div className='type'>{o.type}</div>
            </div>)
        }
      });
    }
    return <Draggable><div className="staff panel">
      <Header text='Staff Panel' close={this.props.close} />
      {staff}
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
      dispatch({type:'TOGGLE_STAFF_PANEL'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffPanel);
