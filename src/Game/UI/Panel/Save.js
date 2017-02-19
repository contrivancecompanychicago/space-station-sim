// @flow
import * as engine from 'Game/engine';

import { connect } from 'react-redux';
import React from 'react';

import Draggable from 'react-draggable'
import Header from './Component/Header'

import listSaves from 'Game/State/listSaves'

class SavePanel extends React.Component {

  

  render() {

    let saves = listSaves();
    console.log(saves);
    saves.map(s => {
      return <div>{s}</div>
    })
    return <Draggable><div className="save panel">
      <Header text='Save Panel' close={this.props.close} />
      {saves}
      <hr />
      new save:
      <input type="text" value="savename" />
      <button>save</button>
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
      dispatch({type:'TOGGLE_SAVE_PANEL'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavePanel);
