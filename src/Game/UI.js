import React from 'react';
import { connect } from 'react-redux';

import Mode from './UI/Mode';
import Grid from './UI/Grid';
import Item from './UI/Item';

class UI extends React.Component {
  render() {
    return <div>
      <button onClick={()=>click('me')}></button>
      <Mode />
      <Grid />
      <Item />
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    mode: state.mode,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    click: (id) => {
      console.log("click", id);
      dispatch({type:'DEMO'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UI);
