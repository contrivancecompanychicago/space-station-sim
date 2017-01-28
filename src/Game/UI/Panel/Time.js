// @flow
import {getTimeManager} from 'Game/engine';

import React from 'react';

import Speed from 'Game/UI/Speed'


export default class TimePanel extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 1000)
  }
  render() {
    const timeManager = getTimeManager();
    // console.log(timeManager);
    if(!timeManager) return <div />

    let date = new Date('1 January 2000');
    date.setHours(9);
    date.setSeconds(timeManager.state.currentTime);



    let hours = date.getHours()
    let minutes = date.getMinutes();
    let daymonth = date.getDate();
    let month = (date.getMonth()+1)
    let year = date.getFullYear();

    let day = ''
    //TODO probably wrong order
    if(date.getDay()==0) day = 'Mon'
    if(date.getDay()==1) day = 'Tues'
    if(date.getDay()==2) day = 'Wed'
    if(date.getDay()==3) day = 'Thurs'
    if(date.getDay()==4) day = 'Fri'
    if(date.getDay()==5) day = 'Sat'
    if(date.getDay()==6) day = 'Sun'

    minutes = Math.floor(minutes/10) * 10;
    if(minutes == 0) minutes = "00" //flow is all like whatever yolo

    let time = hours+":"+minutes+", "+day+" "+daymonth+"/"+month+"/"+year
    return <div className="time panel">
      {time}
      <Speed />
    </div>
  }
}
