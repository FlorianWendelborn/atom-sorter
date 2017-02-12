// region import

const stableStringify = require('json-stable-stringify')

// internal

const getIndentationType = require('../get/indentation-type')

// endregion

// region sortJSON

const sortJSON = (lines, sortingFunction) =>
	stableStringify(
		JSON.parse(lines.join('\n')), {
			space: getIndentationType(lines),
			cmp: sortingFunction
				? (a, b) => a === b
					? sortingFunction(a.value, b.value)
					: sortingFunction(a.key, b.key)
				: undefined
		}
	)

// endregion

// region export

module.exports = sortJSON

// endregion
