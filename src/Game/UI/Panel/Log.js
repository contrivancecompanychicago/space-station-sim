// @flow
import {getLogManager} from 'Game/engine';

import React from 'react';

import Draggable from 'react-draggable'

export default class LogPanel extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 1000)
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
        <h3>Log Panel</h3>
        <div className='logs'>
          {logs}
        </div>
      </div>
    </Draggable>

  }

}
