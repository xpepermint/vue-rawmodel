import {createDebouncer} from './utils';

/*
* Debounce method for delayed validation
*/

export const debounceAsPromised = createDebouncer();

/*
* Sets a new reactive model to the reactive variable defined as `dataKey`. Note
* that this method does not define the reactive variable which holds the model,
* it's resposability of the `mixin` to define one.
*/

export function defineReactiveModel (vm, config) {
  let {dataKey, modelName, modelData, debounceTime} = config;
  let Model = vm.$context[modelName];

  /*
  * Extended contextable.js model with reactive methods.
  */

  class ReactiveModel extends Model {

    /*
    * Rebuilds model's reactivity by recreating the model.
    */

    $build () {
      return this.$populate(this.serialize());
    }

    /*
    * Reactive alternative of the `populate()` method.
    */

    $populate (data) {
      this.populate(data);

      let modelData = this.serialize();
      return defineReactiveModel(vm, Object.assign({}, config, {modelData}));
    }

    /*
    * Reactive alternative of the `validate()` method.
    */

    $validate (opts) { // adding configured validate method
      let handler = () => this
        .validate(opts) // quiet must be true otherwise it throws an error
        .then(() => vm.$forceUpdate()) // calling $forceUpdate because the `validate()` method is asynchroneus
      return debounceAsPromised({handler, time: debounceTime});
    }

    /*
    * Reactive alternative of the `applyErrors()` method.
    */

    $applyErrors (errors)  { // adding configured method for error hydrationa
      this.applyErrors(errors);
      vm.$forceUpdate();
      return this;
    }
  }

  /*
  * Setting the reactive variable (this is how vue apply changes).
  */

  return vm[dataKey] = new ReactiveModel(modelData); // set new model and trigger reactivity
}
