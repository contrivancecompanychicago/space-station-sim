// @flow
import {getOrderManager} from 'Game/engine';

import React from 'react';

import Draggable from 'react-draggable'


export default class OrderPanel extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 1000)
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
      <h3>Orders Panel</h3>
      {orders}
    </div></Draggable>

  }

}
