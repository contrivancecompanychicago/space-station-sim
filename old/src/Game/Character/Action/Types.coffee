module.exports = 
	walk:
		desc: 'wandering around aimlessly'
		waitTime: 0
	wait:
		desc: 'waiting'
		waitTime: 3
	leave:
		desc: 'leaving'
		room: 'dock'
	shop:
		desc: 'going shopping'
		waitTime: 1
		room: 'shop'
		need: ['shop']
	bar:
		desc: 'going to the bar'
		waitTime: 5
		room: 'bar'
		need: ['fun']
	medical:
		desc: 'getting medical attention'
		room: 'medical'
		waitTime: 5
		need: ['medical']