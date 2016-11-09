import {createDebouncer} from 'promised-debounce';

/*
* Creates a debounced function.
*/

export {createDebouncer};

/*
* Returns a last boolean value from the provided array of booleans.
*/

export function chooseOption (values, type) {
  return values.filter((b) => typeof b === type).reverse()[0];
}
