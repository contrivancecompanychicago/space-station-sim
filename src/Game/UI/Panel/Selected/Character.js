//@flow
import React from 'react';
import Draggable from 'react-draggable'
import Header from '../Component/Header'

import { connect } from 'react-redux';
import CharacterRow from '../../Row/Character'

import type Character from 'Game/Type/Character';
import type Obj from 'Game/Type/Object';
import * as engine from 'Game/engine'

import TaskData from 'Game/Data/Task'

import state from 'Game/state'

type Props = {
    target: Character,
    close: Function,
    center: Function,
    follow: Function
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

      let tasks = []
      TaskData.each((key, val, index) => {
        tasks.push(<div key={index}>
          {val.label}
          <input type="checkbox" />
        </div>)
      })

        return <Draggable><div className="selected panel">
            <Header text={this.props.target.toString()} close={this.props.close} />
            <CharacterRow character={this.props.target} />
            {this.props.target.status}
            <div>
              <h3>Tasks</h3>
              {tasks}
            </div>
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
  return {
    center: () => {
      
      state.view.centerOnPoint(props.target.position)
    },
    follow: () => {
      
      state.view.followCharacter(props.target)
    },
    close: () => {
      dispatch({type:'REMOVE_SELECTED', selected: props.target});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCharacterPanel);
