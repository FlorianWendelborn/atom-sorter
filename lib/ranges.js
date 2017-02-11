/*
	Heavily inspired by https://github.com/atom/sort-lines/blob/681d7f42c7a3f5bf2a9dad608b59d36c35a7c9f1/lib/range-finder.coffee

	Therefore parts of this code are actually subject to this LICENSE:

	Copyright (c) 2014 GitHub Inc.

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const { Range } = require('atom')

module.exports = class RangeFinder {
	static rangesFor(editor) {
		return new RangeFinder(editor).ranges();
	}

	constructor(editor) {
		this.editor = editor;
	}

	ranges() {
		let selectionRanges = this.getSelectionRanges();
		if (selectionRanges.length) {
			let that = this;
			// get selection ranges
			return selectionRanges.map(function(selectionRange) {
				// get text
				let text = that.editor.getTextInBufferRange(selectionRange);
				// split by lines
				let textLines = text.split(/\r?\n/g);

				// expand selection range for multi-line selections
				if (textLines.length > 1) {
					return that.sortableRangeFrom(selectionRange);

					// keep selection range for single-line selections
				} else {
					return selectionRange;
				}
			});
		} else {
			// select all lines
			return [this.sortableRangeForEntireBuffer()];
		}
	}

	// get the entire buffer
	sortableRangeForEntireBuffer() {
		return this.editor.getBuffer().getRange();
	}

	// get multiple selection ranges
	getSelectionRanges() {
		return this.editor.getSelectedBufferRanges().filter(range => !range.isEmpty());
	}

	// get one selection range
	sortableRangeFrom(selectionRange) {
		let startRow = selectionRange.start.row;
		let startCol = 0;
		let endRow = selectionRange.end.column === 0 ?
			selectionRange.end.row - 1
		:
			selectionRange.end.row;
		let endCol = this.editor.lineTextForBufferRow(endRow).length;

		return new Range([startRow, startCol], [endRow, endCol]);
	}
};
