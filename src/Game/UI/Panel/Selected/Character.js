//@flow
import React from 'react';
import Draggable from 'react-draggable'
import Header from '../Component/Header'

import { connect } from 'react-redux';
import CharacterRow from '../../Row/Character'

import type Character from 'Game/Type/Character';
import type Obj from 'Game/Type/Object';
import * as engine from 'Game/engine'

type Props = {
    target: Character,
    close: Function
}
class SelectedCharacterPanel extends React.Component{
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
            <Header text={this.props.target.toString()} close={this.props.close} />
            <CharacterRow character={this.props.target} />
            {this.props.target.status}
            <button onClick={this.props.center}>center</button>
            <button onClick={this.props.follow}>follow</button>

        </div></Draggable>
    }
}


function mapStateToProps(state, props) {
  return {
  };
}

function mapDispatchToProps(dispatch, props:Props) {
  // console.log(props)
  return {
    center: () => {
      let viewManager = engine.getViewManager();
      viewManager.centerOnPoint(props.target.position)
    },
    follow: () => {
      let viewManager = engine.getViewManager();
      viewManager.followCharacter(props.target)
    },
    close: () => {
      dispatch({type:'REMOVE_SELECTED', selected: props.target});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCharacterPanel);
