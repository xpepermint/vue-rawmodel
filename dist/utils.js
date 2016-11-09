'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDebouncer = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.chooseOption = chooseOption;

var _promisedDebounce = require('promised-debounce');

/*
* Creates a debounced function.
*/

exports.createDebouncer = _promisedDebounce.createDebouncer;

/*
* Returns a last boolean value from the provided array of booleans.
*/

function chooseOption(values, type) {
  return values.filter(function (b) {
    return (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === type;
  }).reverse()[0];
}