import React from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';
import Button from './Button';

import GridData from 'Game/Data/Grid';

class Grid extends React.Component {
  render() {

    const buttons = [];
    // keys(Grids).forEach((key) => {
    GridData.each((key, val) => {
      buttons.push(<Button type="grid" selected={key===this.props.grid} key={key} data={val} click={()=>this.props.click(key)} />);
    });

    return <div className="grid panel">
      <h3>Grids Panel</h3>
      {buttons}
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    grid: state.grid
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    click: (id) => {
      dispatch({type:'CHANGE_GRID', id: id});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
