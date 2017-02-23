import React from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';
import Button from './Button';

import Grids from 'Game/Data/Grid';
import Tasks from 'Game/Data/Task';

class Task extends React.Component {
  render() {

    const buttons = [];
    Object.keys(Tasks).forEach((taskkey) => {
      Object.keys(Grids).forEach((gridkey) => {
        buttons.push(<Button
          type="task"
          key={taskkey+gridkey}
          grid={gridkey}
          selected={taskkey===this.props.task&&gridkey===this.props.grid}
          data={Grids[gridkey]}
          click={()=>this.props.click(taskkey, gridkey)} />);
      });
    });

    return <div className="grid panel">
      <h3>Tasks Panel</h3>
      {buttons}
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    grid: state.grid,
    task: state.task
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    click: (id, grid) => {
      dispatch({type:'CHANGE_TASK', grid:grid, id: id});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
