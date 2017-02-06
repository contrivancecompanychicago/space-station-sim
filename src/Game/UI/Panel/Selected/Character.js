//@flow
import React from 'react';
import Draggable from 'react-draggable'
import Header from '../Component/Header'

import { connect } from 'react-redux';
import CharacterRow from '../../Row/Character'

import type Character from 'Game/Type/Character';
import type Obj from 'Game/Type/Object';

type Props = {
    target: Character,
    close: Function
}
class SelectedCharacterPanel extends React.Component{
    props: Props
    render(){
        return <div className="selected panel">
            <Header text='Selected Character' close={this.props.close} />
            <CharacterRow character={this.props.target} />
        </div>
    }
}

function mapStateToProps(state, props) {
  return {
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    close: () => {
      dispatch({type:'TOGGLE_SELECTED_PANEL'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCharacterPanel);
