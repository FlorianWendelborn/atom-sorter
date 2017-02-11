// region import

const greatestCommonDivisor = require('compute-gcd')
const natural = require('javascript-natural-sort')
const stableStringify = require('json-stable-stringify')
const {CompositeDisposable} = require('atom')

// internal

const rules = require('./rules')
const RangeFinder = require('./ranges')

// endregion

// region Sorter

class Sorter {

	constructor () {
		this.subscriptions = null
	}

	activate (state) {
		// CompositeDisposable allows event cleanup
		this.subscriptions = new CompositeDisposable()

		// register commands
		return this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'sorter:sort': () => this.sort(),
				'sorter:natural-sort': () => this.sort(natural)
			})
		)
	}

	deactivate () {
		return this.subscriptions.dispose()
	}

	countLines (text) {
		return text.split('\n').length
	}

	splitLines (text) {
		return text.split('\n')
	}

	replaceEOL (text) {
		text = text.replace('\r\n', '\n');
		return text.endsWith('\n')
			? text.slice(0, -1)
			: text
	}

	getIndentation (text) {
		for (let index = 0; index < text.length; index++) {
			if (![' ', '\t'].includes(text[index]))
				return text.substring(0, index)
		}
		return ''
	}

	getIndentationType (lines) {
		const spaces = lines
			.map(line => this.getIndentation(line))
			.filter(([firstCharacter]) => firstCharacter === ' ')
			.map(indentation => indentation.length)

		if (spaces.length) return greatestCommonDivisor(spaces)
		return lines.length > 1
			? '\t'
			: undefined
	}

	sort (sortingFunction) {
		const editor = atom.workspace.getActiveTextEditor()
		if (!editor) return null

		return RangeFinder
			.rangesFor(editor)
			.forEach(range => {
				const text = editor.getTextInBufferRange(range)
				const lines = text.split(/\r?\n/g)

				try {
					// attempt JSON sorting
					// TODO natural-sort
					return editor.setTextInBufferRange(
						range,
						stableStringify(JSON.parse(text), {
							space: this.getIndentationType(lines)
						})
					)
				} catch (error) {}

				if (lines.length === 1) {
					// trim line & remove postfix
					const postfix = text.trim().endsWith(';') ? ';' : ''
					const trimmed = postfix.length
						? text.trim().slice(0, -postfix.length)
						: text.trim()

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
					const indentation = this.getIndentation(text)
					return editor.setTextInBufferRange(range, `${indentation}${content}${postfix}${rule.end}`);
				} else {
					// sortingFunction might be undefined, but that's fine
					lines.sort(sortingFunction)
					return editor.setTextInBufferRange(range, lines.join('\n'));
				}
			})
	}
}

// endregion

// region export

module.exports = new Sorter()

// endregion
