SorterView = require './sorter-view'
{CompositeDisposable} = require 'atom'

module.exports = Sorter =
	SorterView: null
	modalPanel: null
	subscriptions: null

	activate: (state) ->
		@SorterView = new SorterView(state.SorterViewState)
		@modalPanel = atom.workspace.addModalPanel(item: @SorterView.getElement(), visible: false)

		# Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		@subscriptions = new CompositeDisposable

		# Register command that toggles this view
		@subscriptions.add atom.commands.add 'atom-workspace', 'sorter:toggle': => @toggle()

	deactivate: ->
		@modalPanel.destroy()
		@subscriptions.dispose()
		@SorterView.destroy()

	serialize: ->
		SorterViewState: @SorterView.serialize()

	toggle: ->
		console.log 'Sorter was toggled!'

		if @modalPanel.isVisible()
			@modalPanel.hide()
		else
			@modalPanel.show()
