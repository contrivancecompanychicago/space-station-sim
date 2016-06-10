import React from 'react';
import { connect } from 'react-redux';

export default class Mode extends React.Component {
  render() {
    return <div>
      <p>Mode Panel</p>
      <button onClick={()=>this.props.click('me')}>mode {this.props.mode}</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Mode);
