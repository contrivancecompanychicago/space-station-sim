// @flow
import {getOrderManager} from 'Game/engine';

import { connect } from 'react-redux';
import React from 'react';

import Draggable from 'react-draggable'

import Header from './Component/Header'

class OrderPanel extends React.Component {

  interval:number;
  componentDidMount() {
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    const orderManager = getOrderManager();

    let orders = []
    if(orderManager){
      orderManager.state.forEach((o, i) => {
        orders.push(
          <div className='order' key={'order'+i}>

            <div className='customer'>{o.customer.toString()}</div>
            <div className='type'>{o.type}</div>
            <div className='status'>{o.status}</div>
          </div>)
      });
    }
    return <Draggable><div className="order panel">
      <Header text='Orders Panel' close={this.props.close} />
      {orders}
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
      dispatch({type:'TOGGLE_ORDERS_PANEL'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPanel);
