//@flow
import React from 'react';
export default class Updating extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 1000)
  }
}
