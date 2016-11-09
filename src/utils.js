/*
* Creates a debounced function.
*/

export function createDebouncer () {
  let timer = null;

  return function (fn, wait) {
    var resolve;
    var promise = new Promise((r) => resolve = r).then(() => fn.apply(this));

    if (timer)  clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      resolve();
    }, wait);

    return promise;
  };
}

/*
* Returns a last boolean value from the provided array of booleans.
*/

export function chooseOption (values, type) {
  return values.filter((b) => typeof b === type).reverse()[0];
}