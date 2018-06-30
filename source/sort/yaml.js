const YAML = require('js-yaml')

// internal
const getIndentationType = require('../get/indentation-type')

/**
 * @description Attempts to sort YAML lines
 * @param {Array[String]} lines
 * @param {Function} sortKeys sorting function
 * @returns {String} sorted YAML
 */
module.exports = (lines, sortKeys) =>
	YAML.dump(YAML.load(lines.join('\n')), {
		indent: getIndentationType(lines),
		sortKeys,
	})
