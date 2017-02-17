//@flow
import React from 'react';

type Props = {
  type:string,
  data:{
    label: string,
    // image: any|void
  },
  click:Function
}
class Button extends React.Component{
  props:Props
  render(){
    const id = 'button-'+this.props.type+'-'+this.props.data.label;
    let className = this.props.selected?'selected':'';
    className += ' '+id;
    let image = "";
    if(this.props.data.image){
      // FLOWHACK
      image = <img src={this.props.data.image.src} />;
    }
    // FLOWHACK do image proper
    return <button className={className} onClick={this.props.click} onMouseOver={this.props.mouseover}>
      <div className="inner">
        {this.props.data.label}
        <br />
        {image}
      </div>
    </button>;
  }
  // componentDidMount(){
  //   let node = this.getDOMNode();
  // }

}

export default Button;
