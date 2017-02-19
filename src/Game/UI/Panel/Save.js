// @flow
import * as engine from 'Game/engine';

import { connect } from 'react-redux';
import React from 'react';


class SavePanel extends React.Component {

  
  render() {
   
    return <Draggable><div className="save panel">
      <Header text='Aave Panel' close={this.props.close} />
      Save data
    </div></Draggable>
  }
}

function mapStateToProps(state, props) {
  return {
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    close: () => {
      dispatch({type:'TOGGLE_SAVE_PANEL'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavePanel);
