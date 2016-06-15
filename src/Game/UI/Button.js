import React from 'react';


class Button extends React.Component{


  render(){
    return <button className={this.props.selected?'selected':''} onClick={this.props.click}>{this.props.data.label}</button>;
  }

}


export default Button;
