// region getIndentation

const getIndentation = text => {
	for (let index = 0; index < text.length; index++) {
		if (![' ', '\t'].includes(text[index]))
			return text.substring(0, index)
	}
	return ''
}

// endregion

// region export

module.exports = getIndentation

// endregion
