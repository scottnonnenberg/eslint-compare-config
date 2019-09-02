# @scottnonnenberg/eslint-compare-config

A little tool to help you compare [ESLint](http://eslint.org/) configurations, the way ESLint sees them.

Blog post announcing this project: https://blog.scottnonnenberg.com/eslint-part-3-analysis/

[![continous integration](https://img.shields.io/circleci/project/scottnonnenberg/eslint-compare-config/master.svg?maxAge=3600)](https://circleci.com/gh/scottnonnenberg/eslint-compare-config/tree/master) [![code coverage](https://img.shields.io/codecov/c/github/scottnonnenberg/eslint-compare-config/master.svg?maxAge=3600)](https://codecov.io/gh/scottnonnenberg/eslint-compare-config/branch/master) [![npm version](https://img.shields.io/npm/v/@scottnonnenberg/eslint-compare-config.svg?maxAge=3600)](https://www.npmjs.com/package/@scottnonnenberg/eslint-compare-config) [![license](https://img.shields.io/github/license/scottnonnenberg/eslint-compare-config.svg?maxAge=2592000)](https://github.com/scottnonnenberg/eslint-compare-config#license)

## Quickstart

```bash
npm install @scottnonnenberg/eslint-compare-config -g
eslint-compare-config projectDirOne/ projectDirTwo/
```

Here's what you get if you compare [`@scottnonnenberg/thehelp`](https://github.com/scottnonnenberg/eslint-config-thehelp) config versus that config merged with [`@scottnonnenberg/thehelp/test`](https://github.com/scottnonnenberg/eslint-config-thehelp#configurations-in-this-project):

```
Plugins shared: 8
  filenames
  import
  security
  @scottnonnenberg/thehelp
  immutable
  no-loops
  jsx-a11y
  react

Plugins missing from left: 2
  bdd
  chai-expect

Plugins missing from right: None

Extends shared: 2
  @scottnonnenberg/thehelp/react
  @scottnonnenberg/thehelp/functional

Extends missing from left: 1
  @scottnonnenberg/thehelp/test

Extends missing from right: 1
  @scottnonnenberg/thehelp

Rules matching: 271
  [full list omitted for brevity]

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

Note that, to get around ESLint plugin/module-loading semantics, this tool puts a file in each target directory and runs it with Node.js. This means that you'll need write/delete permissions in the target directory.

If you don't have that permssion, your best bet is to go with _literal mode_.

## Options

First, you will always need to provide two paths to the tool. The first is the _left_, and the second is the _right_. These terms will be used in the output.

- `--literal` - by default, the tool uses full ESlint semantics to load configuration. Providing this option changes to a `require()` of the target path, which means normal [Node.js require semantics](https://nodejs.org/api/modules.html#modules_all_together) (various transformations to find JavaScript or JSON to load) apply. Because `require()` is called directly, right now only JavaScript and JSON files are supported.
- `--json` - by default, the difference between the two configurations is displayed in human-readable format (see above). If you'd like to use the data in another tool, this will print the raw JSON.stringified `differences` object to the console.
- `--score` - if you'd like to see the similarity of two configurations at a glance, use this option. 0% is completely different, 100% is exactly the same.

## API

If installed as a dependency, you can `require('@scottnonnenberg/eslint-compare-config')` and get access to a number of functions:

- `getConfigSync(path)` - puts a file in each of the target directories whichs uses `eslint` APIs to load the configuration for a file in that directory, runs them, then deletes them.
- `getLiteralConfigSync(path)` - loads the target files using `require()`, thus supporting only JavaScript and JSON file formats
- `getDifferencesSync(left, right)` - given two configs, produces an object describing all of their differences. The same thing you get when you use the `--json` option
- `getScoreSync(differences)` - given `getDifferences()` output, returns a similarity score 1-100.
- `normalizeConfigSync(config)` - removes disabled rules, and turns numeric toggles into string (1 = 'warning', 2 = 'error')
- `renderDifferencesSync(differences)` - given `getDifferences()` output, returns string with human-readable comparison (including ANSI color codes)

## Contributing

This project uses [`standard-version`](https://github.com/conventional-changelog/standard-version) to release new versions, automatically updating the version number and [changelog](https://github.com/scottnonnenberg/eslint-compare-config/blob/master/CHANGELOG.md) based on commit messages in [standard format](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md). [`ghooks`](https://github.com/gtramontina/ghooks) and [`validate-commit-msg`](https://github.com/kentcdodds/validate-commit-msg) are used to ensure all commit messages match the expected format (see [package.json](https://github.com/scottnonnenberg/eslint-compare-config/blob/master/package.json) for the configuration details).

It takes some getting used to, but this configuration is absolutely worthwhile. A changelog is way easier to understand than the chaos of a raw commit stream, especially with `standard-version` providing direct links to bugs, commits and [commit ranges](https://github.com/scottnonnenberg/eslint-compare-config/compare/v0.4.0...v1.0.0).

## TODO

- Literal mode: support eslint config in YAML and `package.json` files
- Use each rule's defaults in equivalence: just 'error' is the same as ['error', {something: true}] if that config is the same as the default. How to get the default?
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
