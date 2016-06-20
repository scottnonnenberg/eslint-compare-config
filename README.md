# @scottnonnenberg/eslint-compare-config

A little tool to help you compare [ESLint](http://eslint.org/) configurations, the way ESLint sees them.

## Quickstart

```bash
npm install @scottnonnenberg/eslint-compare-config -g
eslint-compare-config projectDirOne/ projectDirTwo/
```

Here's what you get if you compare [`@scottnonnenberg/thehelp`](https://github.com/scottnonnenberg/eslint-config-thehelp) config versus that config merged with [`@scottnonnenberg/thehelp/test`](https://github.com/scottnonnenberg/eslint-config-thehelp#configurations-in-this-project):

```
Plugins missing from left: 2
  bdd
  chai-expect

Plugins missing from right: None

Extends missing from left: 1
  @scottnonnenberg/thehelp/test

Extends missing from right: 1
  @scottnonnenberg/thehelp

Rules missing from left: 5
  bdd/focus
  bdd/exclude
  chai-expect/missing-assertion
  chai-expect/no-inner-compare
  chai-expect/terminating-properties

Rules missing from right: 8
  max-nested-callbacks
  no-magic-numbers
  no-sync
  no-undefined
  no-unused-expressions
  import/no-extraneous-dependencies
  security/detect-non-literal-fs-filename
  immutable/no-let

Rule configuration differences: None

Differences in other configuration: 1
  env.mocha:
    left: undefined
    right: true
```

Because the `test` configuration only adds and disables rules, we don't see any configuration differences. We consider a rule to be 'missing' from a configuration is it is disabled.

## Permissions

Note that, to get around ESLint plugin/module-loading semantics this tool puts a file in each target directory and runs it with Node.js. This means that you'll need write/delete permissions in the target directory.

If you don't have that permssion, your best bet is to go with _literal mode_.

## Options

First, you will always need to provide two paths to the tool. The first is the _left_, and the second is the _right_. These terms will be used in the output.

- `--literal` - by default, the tool uses full ESlint semantics to load configuration. Providing this option changes to a direct load of the target file, so you can no longer provide directories as input. Right now only JavaScript and JSON files are supported.
- `--json` - by default, the difference between the two configurations is displayed in human-readable format (see above). If you'd like to use the data in another tool, this will print the raw JSON.stringified `differences` object to the console.
- `--score` - if you'd like to see the similarity of two configurations at a glance, use this option. 0% is completely different, 100% is exactly the same.

## API

If installed as a dependency, you can `require('eslint-compare-config')` and get access to a number of functions:

- `getConfig(path)` - puts a file in each of the target directories whichs uses `eslint` APIs to load the configuration for a file in that directory, runs them, then deletes them.
- `getDifferences(left, right)` - given two configs, produces an object describing all of their differences. The same thing you get when you use the `--json` option
- `getLiteralConfig(path)` - loads the target files using `require()`, thus supporting only JavaScript and JSON file formats
- `getScore(differences)` - given `getDifferences()` output, returns a similarity score 1-100.
- `normalizeConfig(config)` - removes disabled rules, and turns numeric toggles into string (1 = 'warning', 2 = 'error')
- `renderDifferences(differences)` - given `getDifferences()` output, returns string with human-readable comparison (including ANSI color codes)

## TODO

- Literal mode: support eslint config in YAML and `package.json` files
- In default output, include overall counts: total, shared, missing left, missing right
- Use open defaults in equivalence: just 'error' is the same as ['error', {something: true}] if that config is the same as the default. How to get the default?
- Determinism: sort rules/plugins/extends by name, rules without / in them first
- Add option to include globals in the diff - there are a lot, so it's too noisy to show by default

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
