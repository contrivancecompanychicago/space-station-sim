// @flow

import React from 'react';
import { connect } from 'react-redux';
import Header from './Panel/Component/Header'

let papa = require('../Data/papagiovanni.png')

class Tutorial extends React.Component {
    render(){
        //RETURN EARLY ON BLANK
        if(!this.props.tutorial.text) return <div />


        // console.log(this.props.tutorial.next);
        let buttons = ''
        if(this.props.tutorial.next){
            buttons = <button onClick={this.props.tutorial.next}>next</button>
        }
        return <div className="tutorial panel">
            <Header text='Tutorial' close={this.props.tutorial.next} />
            {this.props.tutorial.text}
            <br />
            <img src={papa.src} />
            {buttons}
        </div>

    }
}

function mapStateToProps(state, props) {
  return {
    tutorial: state.tutorial,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
