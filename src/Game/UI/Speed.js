import React from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';
import Button from './Button';

import Speeds from 'Game/Type/Speed';

export default class Speed extends React.Component {
  render() {

    const buttons = [];
    keys(Speeds).forEach((key) => {
      buttons.push(<Button type="speed" selected={key===this.props.speed} key={key} data={Speeds[key]} click={()=>this.props.click(key)} />);
    });

    return <div className="speed panel">
      <h3>Speed Panel</h3>
      {buttons}
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    speed: state.speed
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    click: (id) => {
      dispatch({type:'CHANGE_SPEED', id: id});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Speed);
