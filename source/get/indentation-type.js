// region import

const greatestCommonDivisor = require('compute-gcd')

// internal

const getIndentation = require('./indentation')

// endregion

// region utilities

const getIndentationType = lines => {
	const spaces = lines
		.map(line => getIndentation(line))
		.filter(([firstCharacter]) => firstCharacter === ' ')
		.map(indentation => indentation.length)

	if (spaces.length) return greatestCommonDivisor(spaces)
	return lines.length > 1
		? '\t'
		: undefined
}

// endregion

// region export

module.exports = getIndentationType

// endregion
