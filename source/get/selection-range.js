// region import

const {Range} = require('atom')

// endregion

// region getSelectionRange

const getSelectionRange = (editor, range) => {
	const endRow = range.end.column === 0
		? range.end.row - 1
		: range.end.row
	const endCol = editor.lineTextForBufferRow(endRow).length

	return new Range([
		range.start.row,
		0
	], [
		endRow,
		endCol
	])
}

// endregion

// region export

module.exports = getSelectionRange

// endregion
