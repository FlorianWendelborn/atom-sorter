// region sortLine

const sortLines = (lines, sortingFunction) => lines
	.sort(sortingFunction)
	.join('\n')

// endregion

// region export

module.exports = sortLines

// endregion
