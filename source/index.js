const natural = require('javascript-natural-sort')
const { CompositeDisposable } = require('atom')

// internal
const getRanges = require('./get/ranges')
const sortJSON = require('./sort/json')
const sortLine = require('./sort/line')
const sortLines = require('./sort/lines')
const sortYAML = require('./sort/yaml')

// region config

const config = {
	caseSensitive: {
		default: true,
		description: "When sorting naturally, `['a', 'B']` yields `['B', 'a']` rather than `['a', 'B']`.",
		title: 'Case Sensitive Natural Sort',
		type: 'boolean',
	}
}

// endregion

// region subscriptions

const subscriptions = new CompositeDisposable()

const activate = () => {
	natural.insensitive = !atom.config.get('sorter.caseSensitive')

	subscriptions.add(
		atom.config.onDidChange('sorter.caseSensitive', ({ newValue }) => natural.insensitive = !newValue)
	)

	subscriptions.add(
		atom.commands.add('atom-workspace', {
			'sorter:sort': () => sort(),
			'sorter:natural-sort': () => sort(natural),
		})
	)
}

const deactivate = () => subscriptions.dispose()

// endregion

// region sort

const sort = sortingFunction => {
	const editor = atom.workspace.getActiveTextEditor()
	if (!editor) return null

	return getRanges(editor).forEach(range =>
		editor.setTextInBufferRange(
			range,
			(lines => {
				try {
					return sortJSON(lines, sortingFunction)
				} catch (error) {
					if (editor.getGrammar().name === "YAML") {
						return sortYAML(lines, sortingFunction)
					} else {
						return lines.length === 1
							? sortLine(lines[0], sortingFunction)
							: sortLines(lines, sortingFunction)
					}
				}
			})(editor.getTextInBufferRange(range).split(/\r?\n/g))
		)
	)
}

// endregion

module.exports = { activate, config, deactivate }
