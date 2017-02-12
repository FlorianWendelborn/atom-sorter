// region import

const natural = require('javascript-natural-sort')
const {CompositeDisposable} = require('atom')

// internal

const getRanges = require('./get/ranges')
const sortJSON = require('./sort/json')
const sortLine = require('./sort/line')
const sortLines = require('./sort/lines')

// endregion

// region subscriptions

const subscriptions = new CompositeDisposable()

const activate = () => subscriptions.add(
	atom.commands.add('atom-workspace', {
		'sorter:sort': () => sort(),
		'sorter:natural-sort': () => sort(natural)
	})
)

const deactivate = () => subscriptions.dispose()

// endregion

// region sort

const sort = sortingFunction => {
	const editor = atom.workspace.getActiveTextEditor()
	if (!editor) return null

	return getRanges(editor)
		.forEach(range => editor.setTextInBufferRange(
			range,
			(lines => {
				try {
					return sortJSON(lines, sortingFunction)
				} catch (error) {
					return lines.length === 1
						? sortLine(lines[0], sortingFunction)
						: sortLines(lines, sortingFunction)
				}
			})(editor.getTextInBufferRange(range).split(/\r?\n/g))
		))
}

// endregion

// region export

module.exports = {activate, deactivate}

// endregion
