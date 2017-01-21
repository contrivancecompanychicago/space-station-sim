//@flow
import React from 'react';

class Button extends React.Component{

  render(){
    const id = 'button-'+this.props.type+'-'+this.props.data.label;
    let className = this.props.selected?'selected':'';
    className += ' '+id;
    let image = "";
    if(this.props.data.image){
      image = <img src={this.props.data.image.src} />;
    }
    return <button className={className} onClick={this.props.click} onMouseOver={this.props.mouseover}>
    {this.props.data.label}
    {image}
    </button>;
  }
  // componentDidMount(){
  //   let node = this.getDOMNode();
  // }

}

export default Button;
