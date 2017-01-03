# sorter package for atom

It attempts to sort all the things.

## Bindings

By default the following keyboard shortcuts are assigned:

|                          Keyboard Shortcut | API Call            |
|-------------------------------------------:|:--------------------|
| <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>E</kbd>  | sorter:sort         |
| <kbd>Alt</kbd><kbd>Shift</kbd><kbd>E</kbd> | sorter:natural-sort |

## Supported Sorting Algorithms

* Alphabetic Sort

	* default javascript sorting function
	* `sorter:sort`

* Natural Sort

	* attempts to sort like a human would
	* uses [javascript-natural-sort](https://npmjs.org/package/javascript-natural-sort)
	* `sorter:natural-sort`

## Supported Sorting Contexts

* Single-Line-Selections and selections spanning parts of one line

	* `sorter` will attempt to sort any `=`, `,` or ` ` separated values
	* `sorter` will attempt to restore semicolons
	* For example:
		* Input: `a, x, c, 2;`
		* Output: `2, a, c, x;`

* Multi-Line-Selections

	* these will be sorted by line

* Multiple Selections

	* every selection will be handled separately according to the rules above
