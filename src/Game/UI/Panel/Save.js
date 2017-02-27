// @flow
import * as engine from 'Game/engine';

import { connect } from 'react-redux';
import React from 'react';

import Draggable from 'react-draggable'
import Header from './Component/Header'

import listSaves from 'Game/State/listSaves'
import save from 'Game/State/save'
import load from 'Game/State/load'

class SavePanel extends React.Component {
  state:{savename:string}

  constructor(props) {
    super(props);
    this.state = {'savename': 'savename'};
  }

  load(savename:string){
    load(savename);
  }
  save(savename:string){
    save(savename)
    this.forceUpdate()
  }

  render() {



    let saves = listSaves();
    saves = saves.map(s => {
      return <button key={s} onClick={() => {this.load(s)}}>{s}</button>
    })
    return <div className="save panel">
      <Header text='Save Panel' close={this.props.close} />
      
      {saves}
      <hr />
      new save:
      <input type="text" value={this.state.savename} onChange={(e)=>{
        this.setState({savename: e.target.value});
      }} />
      <button onClick={() => {this.save(this.state.savename)}}>save</button>
    </div>
  }
}

function mapStateToProps(state:Object, props:Object):Object {
  return {
  };
}

function mapDispatchToProps(dispatch:Function, props:Object):Object {
  return {
    close: () => {
      dispatch({type:'TOGGLE_SAVE_PANEL'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavePanel);
