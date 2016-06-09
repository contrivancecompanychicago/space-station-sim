import React from 'react';
import { connect } from 'react-redux';

import Mode from './UI/Mode';
import Grid from './UI/Grid';
import Item from './UI/Item';

class UI extends React.Component {
  render() {
    return <div>
      <button onClick={()=>this.props.click('me')}>click me</button>
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
      console.log("click", id);
      console.log(dispatch);
      dispatch({type:'DEMO'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UI);
