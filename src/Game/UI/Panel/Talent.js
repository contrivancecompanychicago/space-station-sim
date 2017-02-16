// @flow

import React from 'react';
import { connect } from 'react-redux';

import {keys} from 'lodash'

import Draggable from 'react-draggable'
import Header from './Component/Header'

import Button from 'Game/UI/Button'

import Talent from 'Game/Data/Talent'
import type TalentType from 'Game/Data/Talent'

class TalentPanel extends React.Component {
    render() {

        let talents = []
        // console.log(Object.keys(Talent).forEach((t) => {


        // }))

        keys(Talent).forEach((t) => {
            console.log(t);
            let tal = Talent[t]
            
            talents.push(<Button click={console.log} data={tal} type='talent' />)
        })

        return <Draggable><div className="talent panel">
            <Header text='Talent Panel' close={this.props.close} />
            talents:<br />
            {talents}

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
      dispatch({type:'TOGGLE_TALENT_PANEL'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentPanel);
