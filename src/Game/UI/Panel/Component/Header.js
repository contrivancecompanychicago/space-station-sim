//@flow
import React from 'react'

import Close from './Close'

type Props = {
  close:Function,
  text:string
}

export default class Header extends React.Component{
  props:Props
  render(){
    return <h3 className='header'>
      {this.props.text}
      <Close close={this.props.close} />
    </h3>
  }
}
