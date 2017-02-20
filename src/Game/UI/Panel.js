//@flow

import React from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';
import Button from './Button';

// import Grids from 'Game/Data/Grid';

import type {UIState} from 'Game/Model/UI'

class Panel extends React.Component {
  render() {
    
    // const buttons = [];
    // keys(Grids).forEach((key) => {
    //   buttons.push(<Button type="grid" selected={key===this.props.grid} key={key} data={Grids[key]} click={()=>this.props.click(key)} />);
    // });
    return <div className="panels panel">
      <h3>Info Panels</h3>
      <Button type="panel" selected={false} data={{label:'Logs'}} click={()=>this.props.click('TOGGLE_LOG_PANEL')} />
      <Button type="panel" selected={false} data={{label:'Hiring'}} click={()=>this.props.click('TOGGLE_HIRING_PANEL')} />
      <Button type="panel" selected={false} data={{label:'Staff'}} click={()=>this.props.click('TOGGLE_STAFF_PANEL')} />
      <Button type="panel" selected={false} data={{label:'Orders'}} click={()=>this.props.click('TOGGLE_ORDERS_PANEL')} />
      <Button type="panel" selected={false} data={{label:'Talents'}} click={()=>this.props.click('TOGGLE_TALENT_PANEL')} />
      <Button type="panel" selected={false} data={{label:'Save/Load'}} click={()=>this.props.click('TOGGLE_SAVE_PANEL')} />
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
