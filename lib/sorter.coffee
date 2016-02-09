SorterView = require './sorter-view'
RangeFinder = require './modules/srot-lines/lib/range-finder'
{CompositeDisposable} = require 'atom'
# natural = require 'natural-sort'

module.exports = Sorter =
	subscriptions: null

	activate: (state) ->
		# Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		@subscriptions = new CompositeDisposable

		# Register command that toggles this view
		@subscriptions.add atom.commands.add 'atom-workspace', 'sorter:sort': => @sort()

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

	sort: ->
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

				# comma separated
				if text.indexOf(',') != -1
					splitString = ','
					joinString = ', '

				# space separated
				else if text.indexOf(' ') != -1
					splitString = joinString = ' '

				# skip other formats
				else return

				# trim whitespace from each element
				things = text.split(splitString).map (x) ->
					x.trim()

				# sort & merge the elements
				sorted = things.sort().join(joinString)

				# insert the sorted elements
				editor.setTextInBufferRange(range, indentation + sorted + end)

			else
				textLines.sort()
				editor.setTextInBufferRange(range, textLines.join("\n"))
		#
		# selections = editor.getSelections()
		#
		# for selection in selections
		# 	do (selection) ->
		# 	text = @replaceEOL(selection.getText())
		#
		# 	if @countLines(text) == 1
		# 		# gather information & remove whitespace
		# 		indentation = @removeIndentation(text)
		# 		text = text.trim()
		#
		# 		# determine end of sorted string
		# 		if text.endsWith ';'
		# 			end = ';\n'
		# 			text = text.slice(0, -1)
		# 		else
		# 			end = '\n'
		#
		# 		# handle ',' and ' ' separated strings
		# 		if text.indexOf(',') != -1
		# 			splitString = ','
		# 			joinString = ', '
		#
		# 		else if text.indexOf(' ') != -1
		# 			splitString = joinString = ' '
		#
		# 		else continue
		#
		# 		# trim whitespace from each element
		# 		things = text.split(splitString).map (x) ->
		# 			x.trim()
		#
		# 		# sort & merge the elements
		# 		sorted = things.sort().join(joinString)
		#
		# 		# insert the sorted elements
		# 		selection.insertText(indentation + sorted + end)
		#
		# 	else
		# 		lines = @splitLines(text).sort()
		# 		selection.insertText(lines.join('\n') + '\n', {select: true})
