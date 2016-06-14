# eslint-compare-config

A little tool to help you compare your eslint configurations.

## Quickstart

```bash
npm install eslint-compare-config -g
eslint-compare-config projectOne/.eslintrc.js projectTwo/.eslintrc.js
```

## Permissions

Note that, to get around `eslint` plugin/module-loading semantics this tool puts a file in the target directory and run it with Node.js. This means that you'll need write/delete permissions in the target directory. If you don't have that, your best bet is to go with 'literal mode.'

## Options

First, you will always need to provide two paths to the tool. The first is the _left_, and the second is the _right_. These terms will be used in the output.

- `--literal` - by default, the tool uses full `eslint` semantics to load configuration. Providing this option changes to a direct load of the target file. Today only JavaScript and JSON files are supported.
- `--json` - by default, the difference between the two configurations is displayed in human-readable format. If you'd like to use the data in another tool, this will print the raw JSON.stringified `differences` object to the console.
- `--score` - if you'd like to see the similarity of two configurations at a glance, use this option. 0% is completely different, 100% is exactly the same.

## API

If installed as a dependency, you can `require('eslint-compare-config')` and get access to a number of functions:

- `getConfig(leftPath, rightPath)` - puts a file in each of the target directories whichs uses `eslint` APIs to load the configuration for a file in that directory, runs them, then deletes them.
- `getDifferences(left, right)` - given two configs, produces an object describing all of their differences. The same thing you get when you use the `--json` option
- `getLiteralConfig(leftPath, rightPath)` - loads the target files using `require()`, thus supporting only JavaScript and JSON file formats
- `getScore(differences)` - given `getDifferences()` output, returns a similarity score 1-100.
- `renderDifferences(differences)` - given `getDifferences()` output, returns string with human-readable comparison (including ANSI color codes)

## TODO

- Literal mode: support eslint config in YAML and `package.json` files
- In default output, include overall counts: total, shared, missing left, missing right
- Support extended equivalence:
  * 0 === 'off', 1 === 'warning', 2 === 'error'
  * just 'error' is the same as ['error', {something: true}] if that config is the same as the default. How to get the default?
- Determinism: sort rules/plugins/extends by name, rules without / in them first
- Test in a directory without ESLint installed - how do we propagate errors from file dropped on disk?

## License

(The MIT license)

Copyright (c) 2016 Scott Nonnenberg <scott@nonnenberg.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
