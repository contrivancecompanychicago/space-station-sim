var codeplanConfig = {
	board: [
		{
			name: "Tasks",
			url: "tasks",
			type: "task",
			filter: (i) => {return !i.release},
			column: {
				type: 'state',
			}
		},
		{
			name: "Prioritisation",
			url: "tasks",
			type: "task",
			filter: (i) => {return (!i.state)||(i.state == 'PRIORITY') },
			column: {
				type: 'state',
			}
		},
		{
			name: "Releases",
			url: "releases",
			type: "task",
			filter: (i) => {return i.state == 'DONE'},
			column: {
				type: 'release',
			}

		}
	],
	type: [
		{
			"id": "state",
			"name": "State",
			"dataFields": {
				"name": {
					"type": "string"
				}
			},
			"attributeFields": {},
			items: [
				{"id": 'TODO', "name": "To do"},
				{"id": 'PRIORITY', "name": "prioritised"},
				{"id": "DEV","name": "in dev"},
				{"id": "DONE","name": "done"}
			]
		},
		{
			id: "release",
			name: "Release",
			"dataFields": {
				"name": {
					"type": "string"
				}
			},
			
		},
		{
			id: "epic",
			name: "Epic",
			"dataFields": {
				"name": {
					"type": "string"
				}
			},
			
		},
		{
			"id": "task",
			"name": "Task",
			"dataFields": {
				"name": {
					"type": "string"
				},
				"description": {
					"type": "text"
				},
				"storyPoints": {
					"type": "number"
				}
			},
			"attributeFields": {
				"state": {
					"multiple": false,
					"required": false,
					transition: (item, newValue) => {
						console.log('transition', item.getId(), 'from', item.state, 'to', newValue);
						
						// let from = item.state;
						// if(from)
						// console.log('from', item.state, newValue);
						// console.log('transition', item, newValue);
					}
				},
				"release": {
					"multiple": false,
					"required": false
				},
				"epic": {
					"multiple": false,
					"required": false
				}
			},
		}
	]
}

module.exports = codeplanConfig