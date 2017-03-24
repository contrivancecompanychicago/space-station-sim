// @flow
import React from 'react';
import { connect } from 'react-redux';

import ContextMenuItem from './ContextMenuItem';

import type Character from 'Game/Type/Character'
import type Obj from 'Game/Type/Object'

type Props = {
		character: Character,
		object: Obj,
		position: {x:number, y:number},
		close: Function,
}

class ContextMenu extends React.Component{
		props: Props;
		constructor(props) {
			super(props);
			this.moveHere = this.moveHere.bind(this)
			this.execAction = this.execAction.bind(this)
		}
		moveHere(){
			console.log('movehere', this.props.character, this.props.object)
		}
		execAction(actionType){
			//state.character.execAction(actionType, char, object);
		}
		render() {
			
			let actionTypes = this.props.character.getObjectContextActions(this.props.object);
			
			let menuItems = actionTypes.map(a => {
				return <ContextMenuItem key={a.type+a.taskType} text={a.type+' '+a.taskType} fn={()=>{
					switch(a.type){
						case 'ASSIGN': 
							this.props.character.assignTaskType(a.taskType);
					}
					}} />
			})

			let style = {
					left:this.props.position.x - 10,
					top:this.props.position.y - 10
			}
			
			return <div style={style} onMouseLeave={this.props.close} className="contextMenu">
				{this.props.object.getData().label}
				<div className="items">
					<ContextMenuItem text="cancel" fn={()=>{}} />
					<ContextMenuItem text="move here" fn={this.moveHere} />
					{menuItems}
				</div>
			</div>
		}
}

function mapStateToProps(state:Object, props:Object):Object {
	return {
	};
}

function mapDispatchToProps(dispatch:Function, props:Object):Object {
	return {
		close: (id) => {
			dispatch({type:'CLOSE_CONTEXT_MENU'});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
