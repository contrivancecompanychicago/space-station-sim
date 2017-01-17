import React from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';
import Button from './Button';

import Modes from 'Game/Data/Mode';

export default class Mode extends React.Component {
  render() {

    const buttons = [];
    keys(Modes).forEach((key) => {
      buttons.push(<Button type="mode" selected={key===this.props.mode} key={key} data={Modes[key]} click={()=>this.props.click(key)} />);
    });

    return <div className="mode panel">
      <h3>Mode Panel</h3>
      {buttons}
      <button onClick={() => this.props.rotate()}>rotate {this.props.rotation}</button>
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
      // console.log("asd");
      dispatch({type:'ROTATE'})
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mode);
