"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstMessage = firstMessage;
/*
* Accepts an array of errors and returns the first error message.
*/

function firstMessage(errors) {
  if (!Array.isArray(errors) || errors.length === 0) return null;

  var error = errors[0];
  if (error.message) {
    return error.message;
  } else {
    return error;
  }
}