import React from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';
import Button from './Button';

import Modes from 'Game/Data/Mode';

class ModeButton extends React.Component{
  render() {
    return <Button type="mode"
      selected={this.props.name===this.props.mode}
      key={this.props.name}
      data={Modes.get(this.props.name)}
      // mouseover={()=>this.props.click(this.props.name)}
      click={()=>this.props.click(this.props.name)} />
  }
}

class Mode extends React.Component {
  render() {

    // const buttons = [];
    // keys(Modes).forEach((key) => {
    //   buttons.push(<Button type="mode" selected={key===this.props.mode} key={key} data={Modes[key]} click={()=>this.props.click(key)} />);
    // });
    
    return <div className="mode panel">
      <button onClick={() => this.props.rotate()}>rotate {this.props.rotation}</button>
      <br />
      <ModeButton name='SELECT' mode={this.props.mode} click={this.props.click} />
      <ModeButton name='GRID' mode={this.props.mode} click={this.props.click} />
      <ModeButton name='OBJECT' mode={this.props.mode} click={this.props.click} />
      <ModeButton name='CHAR' mode={this.props.mode} click={this.props.click} />
      <ModeButton name='PANEL' mode={this.props.mode} click={this.props.click} />
      {/*<ModeButton name='ITEM' mode={this.props.mode} click={this.props.click} />*/}
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    mode: state.mode,
    rotation: state.rotation
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    click: (id) => {
      dispatch({type:'CHANGE_MODE', id: id});
    },
    rotate: () => {
      dispatch({type:'ROTATE'})
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mode);
