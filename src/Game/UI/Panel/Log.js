// @flow
import {getLogManager} from 'Game/engine';

import React from 'react';



export default class LogPanel extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 1000)
  }
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
    return <div className="log panel">
      <h3>Log Panel</h3>
      {logs}
    </div>

  }

}
