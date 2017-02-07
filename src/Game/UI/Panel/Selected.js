//@flow

import React from 'react';
// import Draggable from 'react-draggable'
// import Header from './Component/Header'

import SelectedCharacterPanel from './Selected/Character'
import SelectedObjectPanel from './Selected/Object'

import type Character from 'Game/Type/Character';
import type Obj from 'Game/Type/Object';

type Props = {
    target: Character | Obj
}
export default class SelectedPanel extends React.Component{
    props: Props
    render(){
        if(this.props.target.constructor.name === 'Character'){
            let target = ((this.props.target:any):Character) //recast
            return <SelectedCharacterPanel target={target} />
        }else{ //TODO check harder
            let target = ((this.props.target:any):Obj) //recast
            return <SelectedObjectPanel target={target} />
        }
    }
}