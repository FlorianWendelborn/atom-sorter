RangeFinder = require './ranges.coffee'
{CompositeDisposable} = require 'atom'
natural = require 'javascript-natural-sort'

module.exports = Sorter =
	subscriptions: null

	activate: (state) ->
		# Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		@subscriptions = new CompositeDisposable

		# Register command that toggles this view
		@subscriptions.add atom.commands.add 'atom-workspace', 'sorter:sort': => @sort()
		@subscriptions.add atom.commands.add 'atom-workspace', 'sorter:natural-sort': => @sort(natural)

	deactivate: ->
		@subscriptions.dispose()

	countLines: (text) ->
		text.split('\n').length

	splitLines: (text) ->
		text.split('\n')

	replaceEOL: (text) ->
		text = text.replace('\r\n', '\n')
		if text.endsWith('\n')
			return text.slice(0, -1)
		else
			return text

	removeIndentation: (text) ->
		for character, index in text
			if character != ' ' and character != '\t'
				return text.substring(0, index)

	sort: (sortingFunction) ->
		editor = atom.workspace.getActiveTextEditor()
		return unless editor

		that = @

		sortableRanges = RangeFinder.rangesFor(editor)
		sortableRanges.forEach (range) ->
			text = editor.getTextInBufferRange(range)
			textLines = text.split(/\r?\n/g)
			if textLines.length == 1
				indentation = that.removeIndentation(text)
				text = text.trim()
				if text.endsWith ';'
					end = ';'
					text = text.slice(0, -1)
				else
					end = ''

				# map
				separations = [
					{
						find: '="'
						join: '" '
						split: '" '
					}
					{
						find: ';'
						join: '; '
						split: ';'
					}
					{
						find: '='
						join: ' = '
						split: '='
					}
					{
						find: ','
						join: ', '
						split: ','
					}
					{
						find: ':'
						join: ': '
						split: ':'
					}
					{
						find: ' '
						join: ' '
						split: ' '
					}
				]

				# find separation
				separationIndex = -1
				for separation, index in separations
					if text.indexOf(separation.find) != -1
						separationIndex = index
						break

				# skip unknown separations
				return if separationIndex == -1

				# trim whitespace from each element
				things = text.split(separations[separationIndex].split).map (x) ->
					x.trim()

				# sort & merge the elements
				sorted = things.sort() unless sortingFunction
				sorted = things.sort(sortingFunction) if sortingFunction

				# insert the sorted elements
				editor.setTextInBufferRange(range, indentation + sorted.join(separations[separationIndex].join) + end)

			else
				textLines.sort() unless sortingFunction
				textLines.sort(sortingFunction) if sortingFunction
				editor.setTextInBufferRange(range, textLines.join("\n"))
