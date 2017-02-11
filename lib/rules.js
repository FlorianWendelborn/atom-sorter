module.exports = [{
	find: '="',
	join: '" ',
	split: /" |"$/gm,
	end: '"'
}, {
	find: ';',
	join: '; ',
	split: ';',
	end: ''
}, {
	find: '=',
	join: ' = ',
	split: '=',
	end: ''
}, {
	find: ',',
	join: ', ',
	split: ',',
	end: ''
}, {
	find: ':',
	join: ': ',
	split: ':',
	end: ''
}, {
	find: ' ',
	join: ' ',
	split: ' ',
	end: ''
}]
