// @flow

import React from 'react';
import { connect } from 'react-redux';

class Tutorial extends React.Component {
    render(){
        // console.log(this.props.tutorial);
        
        if(!this.props.tutorial.text) return <div />
        // console.log(this.props.tutorial.next);
        let buttons = ''
        if(this.props.tutorial.next){
            buttons = <button onClick={this.props.tutorial.next}>next</button>
        }
        return <div className="tutorial panel">
            {this.props.tutorial.text}
            <br />
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
