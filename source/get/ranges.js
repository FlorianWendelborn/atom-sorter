// region import

const getSelectionRange = require('./selection-range')

// endregion

// region getRanges

const getRanges = editor => {
	const selectionRanges = editor
		.getSelectedBufferRanges()
		.filter(range => !range.isEmpty())

	if (selectionRanges.length) return selectionRanges
		.map(selectionRange => editor
			.getTextInBufferRange(selectionRange)
			.split(/\r?\n/g)
			.length === 1
				? selectionRange
				: getSelectionRange(editor, selectionRange)
		)

	return [
		editor
			.getBuffer()
			.getRange()
	]
}

// endregion

// region export

module.exports = getRanges

// endregion
