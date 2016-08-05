'use strict';

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = {
  // Don't try to find .babelrc because we want to force this configuration.
  babelrc: false,
  // This is a feature of `babel-loader` for webpack (not Babel itself).
  // It enables caching results in OS temporary directory for faster rebuilds.
  cacheDirectory: true,
  presets: [
  // let, const, destructuring, classes, modules
  'babel-preset-es2015',
  // exponentiation
  'babel-preset-es2016',
  // JSX, Flow
  'babel-preset-react'],
  plugins: [
  // function x(a, b, c,) { }
  'babel-plugin-syntax-trailing-function-commas',
  // await fetch()
  'babel-plugin-syntax-async-functions',
  // class { handleClick = () => { } }
  'babel-plugin-transform-class-properties',
  // { ...todo, completed: true }
  'babel-plugin-transform-object-rest-spread',
  // function* () { yield 42; yield 43; }
  'babel-plugin-transform-regenerator',
  // Polyfills the runtime needed for async/await and generators
  ['babel-plugin-transform-runtime', {
    helpers: false,
    polyfill: false,
    regenerator: true
  }]]
};