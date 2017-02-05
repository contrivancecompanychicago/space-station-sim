//@flow
import React from 'react'

type Props = {
  close:Function
}

export default class Close extends React.Component{
  props:Props
  render(){
    return <div className='close' onClick={this.props.close}>X</div>
  }
}
