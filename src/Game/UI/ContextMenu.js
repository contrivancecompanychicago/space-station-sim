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

class ContextMenuObject extends React.Component{
	render() {
		if(!this.props.object) return null
		let buttons = []
		if(this.props.object.hasAbility('FRIDGE')){
			buttons = <ContextMenuItem id="STARTCOOK" key={"fridge"} text="start pizza" fn={()=>{

			}} />
		}
		
		return <div>
			{this.props.object.getData().label}
			<div className="items">
				{this.props.character.getObjectContextActions(this.props.object).map(a => {
					return <ContextMenuItem key={a.type+a.taskType} text={a.type+' '+a.taskType} fn={()=>{
						switch(a.type){
							case 'ASSIGN': 
								this.props.character.assignTaskType(a.taskType);
						}
						}} />
				})}
				{buttons}
			</div>
		</div>
	}
}

class ContextMenu extends React.Component{
		props: Props;
		constructor(props) {
			super(props);
			this.moveHere = this.moveHere.bind(this)
			this.execAction = this.execAction.bind(this)
		}
		moveHere(){
			// console.log('movehere', this.props.character, this.props.object)
			if(this.props.object){
				this.props.character.moveToObject(this.props.object);
			}else{
				this.props.character.moveToBlock(this.props.block);
			}
			this.props.close();
		}
		execAction(actionType){
			//state.character.execAction(actionType, char, object);
		}
		render() {
			let style = {
					left:this.props.position.x - 10,
					top:this.props.position.y - 10
			}
			return <div style={style} onMouseLeave={this.props.close} className="contextMenu">
				block {this.props.block.x}-{this.props.block.y}
				<div className="block">
					<ContextMenuItem id="MOVEHERE" text="move here" fn={this.moveHere} />
				</div>
				<ContextMenuObject character={this.props.character} object={this.props.object} />
				{this.props.items.map((i:Item) => {
					return <div>
						{i.getData().label}
						<ContextMenuItem id={"PICKUP"+i.getId()} text="pick up" fn={()=>{console.log('i', i);
						}} />
					</div>
				})}
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
