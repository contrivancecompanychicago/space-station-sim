import React from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';

const Modes = {
  'SELECT': 'select',
  'GRID': 'grid',
  'ITEM': 'item',
};


export default class Mode extends React.Component {
  render() {

    const buttons = [];
    keys(Modes).forEach((key) => {
      buttons.push(<button key={key} onClick={()=>this.props.click(key)}>{key}</button>);
    });

    return <div>
      <h3>Mode Panel</h3>
      {this.props.mode} selected
      {buttons}
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
      dispatch({type:'CHANGE_MODE', id: id});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mode);
