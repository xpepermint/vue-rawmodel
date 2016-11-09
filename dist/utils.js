"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createDebouncer = createDebouncer;
exports.chooseOption = chooseOption;
/*
* Creates a debounced function.
*/

function createDebouncer() {
  var timer = null;

  return function (fn, wait) {
    var _this = this;

    var resolve;
    var promise = new Promise(function (r) {
      return resolve = r;
    }).then(function () {
      return fn.apply(_this);
    });

    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      timer = null;
      resolve();
    }, wait);

    return promise;
  };
}

/*
* Returns a last boolean value from the provided array of booleans.
*/

function chooseOption(values, type) {
  return values.filter(function (b) {
    return (typeof b === "undefined" ? "undefined" : _typeof(b)) === type;
  }).reverse()[0];
}