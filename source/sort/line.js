// region import

const getIndentation = require('../get/indentation')

// endregion

// region rules

const rules = [{
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

// endregion

// region sortLine

const sortLine = (line, sortingFunction) => {
	// trim line & remove postfix
	const postfix = line.trim().endsWith(';')
		? ';'
		: ''

	const trimmed = postfix.length
		? line.trim().slice(0, -postfix.length)
		: line.trim()

	// find rule
	const rule = rules.filter(({find}) => trimmed.includes(find))[0]
	if (!rule) return null

	// transform content
	const content = trimmed
		.split(rule.split)
		.filter(x => !!x)
		.map(x => x.trim())
		.sort(sortingFunction)
		.join(rule.join)

	// re-assemble the line
	return `${getIndentation(line)}${content}${postfix}${rule.end}`
}

// endregion

// region export

module.exports = sortLine

// endregion
