//@flow

import React from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';
import Button from './Button';

// import Grids from 'Game/Data/Grid';

import type {UIState} from 'Game/state'

class Panel extends React.Component {
  render() {
    
    // const buttons = [];
    // keys(Grids).forEach((key) => {
    //   buttons.push(<Button type="grid" selected={key===this.props.grid} key={key} data={Grids[key]} click={()=>this.props.click(key)} />);
    // });
    return <div className="panels panel">
      <h3>Info Panels</h3>
      <Button type="panel" selected={false} data={{label:'mylabel'}} click={()=>this.props.click('TOGGLE_LOG_PANEL')} />
    </div>;
  }
}

function mapStateToProps(state:UIState, props) {
  return {
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    click: (type) => {
      dispatch({type:type});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
