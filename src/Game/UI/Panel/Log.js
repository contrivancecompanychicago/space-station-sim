// @flow


import React from 'react';

import { connect } from 'react-redux';
import Draggable from 'react-draggable'

import Header from './Component/Header'

import state from 'Game/state'
class LogPanel extends React.Component {

  interval:number;
  componentDidMount() {
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // mousedown(e:Event){
  //   console.log("md", e);
  // }
  // mouseup(e:Event){
  //   console.log("mu", e);
  // }
  render() {
    const logManager = state.log

    let logs = []
    if(logManager){
      logManager.log.forEach((o, i) => {
        logs.push(
          <div className='log' key={'log'+i}>
            <div className='message'>{o.message}</div>
          </div>)
      });
    }
    return <Draggable>
      <div className="log panel">
        <Header text='Log Panel' close={this.props.close} />
        <div className='logs'>
          {logs}
        </div>
      </div>
    </Draggable>

  }

}

function mapStateToProps(state, props) {
  return {
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    close: () => {
      dispatch({type:'TOGGLE_LOG_PANEL'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogPanel);
