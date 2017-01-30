//@flow
import React from 'react'

type Props = {
  percent:number,
  text: string;
}

export default class Bar extends React.Component{
  props:Props
  render() {
    let style = {width:this.props.percent+"%"}
    return <div className="bar component">
      <div className="inner" style={style}> </div>
      <div className="text">
        {this.props.text}
      </div>
    </div>
  }
}
