import React from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';
import Button from './Button';

import Objects from 'Game/Type/Object';

/////////////////////Object is a reserved word
export default class Objekt extends React.Component {
  render() {

    const buttons = [];
    keys(Objects).forEach((key) => {
      buttons.push(<Button type="object" selected={key===this.props.object} key={key} data={Objects[key]} click={()=>this.props.click(key)} />);
    });

    return <div className="object panel">
      <h3>Object Panel</h3>
      {buttons}
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    object: state.object
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    click: (id) => {
      dispatch({type:'CHANGE_OBJECT', id: id});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Objekt);
