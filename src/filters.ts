/*
* Accepts an array of errors and returns the first error message.
*/

export function firstMessage (errors) {
  if (
    !Array.isArray(errors)
    || errors.length === 0
  ) return null;

  let error = errors[0];
  if (error.message) {
    return error.message;
  }
  else {
    return error;
  }
}
