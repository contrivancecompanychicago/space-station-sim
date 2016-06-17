import React from 'react';

class Button extends React.Component{

  render(){
    const id = 'button-'+this.props.type+'-'+this.props.data.label;
    let className = this.props.selected?'selected':'';
    className += ' '+id;
    return <button className={className} onClick={this.props.click}>
    {this.props.data.label}
    </button>;
  }

}

export default Button;
