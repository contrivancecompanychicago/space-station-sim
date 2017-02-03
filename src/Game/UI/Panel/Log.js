// @flow
import {getLogManager} from 'Game/engine';

import React from 'react';

import { connect } from 'react-redux';
import Draggable from 'react-draggable'

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
    const logManager = getLogManager();

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
        <h3 onClick={this.props.close}>Log Panel</h3>
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
