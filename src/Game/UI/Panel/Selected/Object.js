//@flow
import React from 'react';
import Draggable from 'react-draggable'
import Header from '../Component/Header'

import { connect } from 'react-redux';
// import CharacterRow from '../../Row/Character'

import type Character from 'Game/Type/Character';
import type Obj from 'Game/Type/Object';

type Props = {
    target: Obj,
    close: Function
}
class SelectedObjectPanel extends React.Component{
    props: Props
    
    interval:number;
    componentDidMount() {
      this.interval = setInterval(() => {
        this.forceUpdate();
      }, 1000)
    }
    componentWillUnmount() {
      clearInterval(this.interval)
    }
    
    render(){
        return <Draggable><div className="selected panel">
            <Header text={this.props.target.type} close={this.props.close} />
            object
            {JSON.stringify(this.props.target)}
        </div></Draggable>
    }
}


function mapStateToProps(state, props) {
  return {
  };
}

function mapDispatchToProps(dispatch, props) {
  // console.log(props)
  return {
    close: () => {
      dispatch({type:'REMOVE_SELECTED', selected: props.target});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedObjectPanel);
