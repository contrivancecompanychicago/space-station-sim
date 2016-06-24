import React from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';
import Button from './Button';

import Grids from 'Game/Type/Grid';
import Tasks from 'Game/Type/Task';

export default class Task extends React.Component {
  render() {

    const buttons = [];
    keys(Tasks).forEach((taskkey) => {
      keys(Grids).forEach((gridkey) => {
        // console.log(taskkey, gridkey);
        // console.log(taskkey,this.props.task,gridkey,this.props.grid);
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
