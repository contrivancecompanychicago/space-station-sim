import React from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';
import Button from './Button';

import ItemData from 'Game/Data/Item';

class Item extends React.Component {
  render() {

    const buttons = [];
    // keys(Items).forEach((key) => {
    ItemData.each((key, val) => {
      buttons.push(<Button type="item" selected={key===this.props.item} key={key} data={val} click={()=>this.props.click(key)} />);
    });

    return <div className="item panel">
      <h3>Item Panel</h3>
      {buttons}
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    item: state.item
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    click: (id) => {
      dispatch({type:'CHANGE_ITEM', id: id});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
