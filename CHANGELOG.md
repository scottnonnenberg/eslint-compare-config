# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/scottnonnenberg/eslint-compare-config/compare/v1.0.1...v1.1.0) (2021-12-09)


### Features

* **eslint:** Support for modern eslint versions ([f23fdc4](https://github.com/scottnonnenberg/eslint-compare-config/commit/f23fdc4107c10ea6a8a7dcc8b19dcbd2153b9e04))

<a name="1.0.1"></a>
## [1.0.1](https://github.com/scottnonnenberg/eslint-compare-config/compare/v1.0.0...v1.0.1) (2017-01-13)


### Bug Fixes

* **normalization:** coerce plain string rule config to array ([#5](https://github.com/scottnonnenberg/eslint-compare-config/issues/5)) ([1c8115c](https://github.com/scottnonnenberg/eslint-compare-config/commit/1c8115c))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/scottnonnenberg/eslint-compare-config/compare/v0.4.0...v1.0.0) (2016-06-20)


### Features

* **API:** Add sync postfix to all public functions ([59848b9](https://github.com/scottnonnenberg/eslint-compare-config/commit/59848b9))
* **API:** Simplify getConfig and getLiteralConfig to take one path ([9c46df4](https://github.com/scottnonnenberg/eslint-compare-config/commit/9c46df4))
* **diff:** Four rules sections are now mutually exclusive ([c2350af](https://github.com/scottnonnenberg/eslint-compare-config/commit/c2350af))


### BREAKING CHANGES

* API: All public methods go from xxx() to xxxSync() to make
it clear that all methods are synchronous.
* API: getConfig and getLiteralConfig previously always took
two parameters, one for each config to be compared. Now takes just one
path, loading one config at a time. 
* diff: sharedRules key in diff object was changed to 
matchingRules, and no longer includes the rules in the ruleDifferences
array.



<a name="0.4.0"></a>
# [0.4.0](https://github.com/scottnonnenberg/eslint-compare-config/compare/v0.3.0...v0.4.0) (2016-06-15)


### Features

* **output:** Show shared rules, plugins and extends ([438f1d2](https://github.com/scottnonnenberg/eslint-compare-config/commit/438f1d2))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/scottnonnenberg/eslint-compare-config/compare/v0.2.0...v0.3.0) (2016-06-15)


### Bug Fixes

* **dependencies:** Remove eslint as production dependency! ([bf8d6ec](https://github.com/scottnonnenberg/eslint-compare-config/commit/bf8d6ec))


### Features

* **normalize:** Normalize configurations before comparison ([3327a66](https://github.com/scottnonnenberg/eslint-compare-config/commit/3327a66))
* **output:** Show counts for each section in human-readable diff ([e55fbc8](https://github.com/scottnonnenberg/eslint-compare-config/commit/e55fbc8))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/scottnonnenberg/eslint-compare-config/compare/v0.1.0...v0.2.0) (2016-06-14)


### Bug Fixes

* Remove __get_config.js from target dir even if things go wrong ([739c3a1](https://github.com/scottnonnenberg/eslint-compare-config/commit/739c3a1))


### Features

* **directories:** Support target directories in normal mode ([e3bf811](https://github.com/scottnonnenberg/eslint-compare-config/commit/e3bf811))
* **license:** Officially open-source project with the MIT license ([ac64b59](https://github.com/scottnonnenberg/eslint-compare-config/commit/ac64b59))
* **name:** Moved to scoped package name ([8a1f5f1](https://github.com/scottnonnenberg/eslint-compare-config/commit/8a1f5f1))


<a name="0.1.0"></a>
# 0.1.0 (2016-06-03)

- First version of tool! Normal and literal config loading. Normal, JSON and score modes for difference output.
