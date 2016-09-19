import React from 'react';
import { connect } from 'react-redux';

import Mode from './UI/Mode';
import Grid from './UI/Grid';
import Item from './UI/Item';
import Character from './UI/Character';
import Task from './UI/Task';
import Speed from './UI/Speed';
import Objekt from './UI/Object';


class UI extends React.Component {
  render() {
    return <div className="ui">
      <Mode />
      <Grid />
      <Item />
      <Character />
      <Task />
      <Speed />
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    mode: state.mode
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    click: (id) => {
      dispatch({type:'CHANGE_MODE'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UI);
