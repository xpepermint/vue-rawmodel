'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDebouncer = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.chooseOption = chooseOption;

var _promisedDebounce = require('promised-debounce');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Creates a debounced function.
*/

exports.createDebouncer = _promisedDebounce.createDebouncer;

/*
* Returns a last boolean value from the provided array of booleans.
*/

function chooseOption(values, type) {
  return values.filter(function (b) {
    return (typeof b === 'undefined' ? 'undefined' : (0, _typeof3.default)(b)) === type;
  }).reverse()[0];
}