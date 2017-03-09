# Sorter

[![Slack](https://slack.dodekeract.com/badge.svg)](https://slack.dodekeract.com)
[![Package Installs](https://img.shields.io/apm/dm/sorter.svg?style=flat-square)](https://atom.io/packages/sorter)
[![Package Version](https://img.shields.io/apm/v/sorter.svg?style=flat-square)](https://atom.io/packages/sorter)

> Sort all the things!

## Installation

```bash
apm install sorter
```

## Bindings

By default the following keyboard shortcuts are assigned:

|                          Keyboard Shortcut | API Call            |
|-------------------------------------------:|:--------------------|
|  <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>E</kbd> | sorter:sort         |
| <kbd>Alt</kbd><kbd>Shift</kbd><kbd>E</kbd> | sorter:natural-sort |

## Supported Sorting Algorithms

* Alphabetic Sort

	* default javascript sorting function
	* `sorter:sort`

* Natural Sort

	* sorts like a human
	* uses [javascript-natural-sort](https://npmjs.org/package/javascript-natural-sort)
	* `sorter:natural-sort`

## Supported Sorting Contexts

* Single-Line-Selections and selections spanning parts of one line

	* `sorter` will attempt to sort JSON
	* `sorter` will attempt to sort HTML
	* `sorter` will attempt to sort CSS
	* `sorter` will attempt to sort any `=`, `,` or ` ` separated values
	* `sorter` will attempt to restore semicolons and indentation
	* For example:
		* `{"b":0,"a":1}` → `{"a":1,"b":0}`
		* `id="a" class="example"` → `class="example" id="a"`
		* `a, x, c, 2;` → `2, a, c, x;`

* Multi-Line-Selections

	* `sorter` will attempt to sort JSON
	* these will be sorted by line

* Multiple Selections

	* every selection will be handled separately according to the rules above
