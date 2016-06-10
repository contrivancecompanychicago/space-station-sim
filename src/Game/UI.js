import React from 'react';
import { connect } from 'react-redux';

import Mode from './UI/Mode';
import Grid from './UI/Grid';
import Item from './UI/Item';

class UI extends React.Component {
  render() {
    return <div>
      <button onClick={()=>this.props.click('me')}>mode {this.props.mode}</button>
      <p>{this.props.test}</p>
      <Mode />
      <Grid />
      <Item />
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    mode: state.mode,
    test: 'a test string'
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
