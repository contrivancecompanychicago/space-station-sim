// @flow
import {getOrderManager} from 'Game/engine';

import React from 'react';



export default class OrderPanel extends React.Component {
  render() {
    const orderManager = getOrderManager();

    let orders = []
    if(orderManager){
      orderManager.state.forEach((o) => {
        orders.push(<div>
            {JSON.stringify(o)}
          </div>)
      });
    }
    return <div className="order panel">
      <h3>Orders Panel</h3>
      {orders}
    </div>

  }

}
