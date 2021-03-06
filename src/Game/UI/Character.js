import React from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';
import Button from './Button';

import Chars from 'Game/Data/Character';

class Character extends React.Component {
  render() {

    const buttons = [];
    // keys(Chars).forEach((key) => {
    Chars.each((key, value) => {
      buttons.push(<Button type="char" selected={key===this.props.character} key={key} data={value} click={()=>this.props.click(key)} />);
    });

    return <div className="char panel">
      <h3>Chars Panel</h3>
      {buttons}
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    character: state.character
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    click: (id) => {
      dispatch({type:'CHANGE_CHAR', id: id});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Character);
