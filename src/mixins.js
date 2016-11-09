import {
  createDebouncer,
  chooseOption
} from './utils';
import * as filters from './filters';

/*
* Debounce method for delayed validation
*/

export const debounceAsPromised = createDebouncer();

/*
* Component mixins.
*/

export function createMixins (Vue, options = {}) {
  return {

    /*
    * A hash of filters to be made available to the Vue instance.
    */

    filters,

    /*
    * Called synchronously after the component is initialized.
    */

    beforeCreate () {
      let context = this.$options.context; // retrieve context instance
      if (context) { // memorize the context instance so we can retrieve it in a root component
        this._context = context;
      }

      let contextable = Object.assign({}, options, this.$options.contextable); // retrieve contextable option
      let recipies = contextable.validate; // retrieving model definitions
      if (recipies) {

        for (let recipe of recipies) { // loop through model definitions
          let {dataKey, modelName} = recipe; // define reactive models
          let delay = chooseOption([300, contextable.debounce, recipe.debounce], 'number');
          let model = new this.$context[modelName]();

          model.$validate = () => { // adding configured validate method
            return debounceAsPromised(() => (
              model
                .validate({quiet: true}) // quiet must be true otherwise it throws an error
                .then(() => this.$forceUpdate()) // calling $forceUpdate because the `validate()` method is asynchroneus
            ), delay);
          };

          Vue.util.defineReactive(this, dataKey, model); // define the model in the `data` block
        }
      }
    },

    /*
    * Called synchronously after the component is created.
    */

    created () {
      this._watchers = [];

      let contextable = Object.assign({}, options, this.$options.contextable); // retrieve contextable option
      let recipies = contextable.validate; // retrieving model definitions
      if (recipies) {

        for (let recipe of recipies) { // loop through model definitions
          let {dataKey} = recipe;
          let reactive = chooseOption([true, contextable.reactive, recipe.reactive], 'boolean');
          let immediate = chooseOption([false, contextable.immediate, recipe.immediate], 'boolean');
          let validate = (newVal) => newVal.$validate();

          if (reactive) {
            this._watchers.push(
              this.$watch(dataKey, validate, {deep: true, immediate}) // starts watching the model for changes
            );
          }
        }
      }
    },

    /*
    * Called after the component has been destroyed.
    */

    destroyed () {
      if (this._watchers) { // unwatch the model
        this._watchers.forEach((unwatch) => unwatch());
        this._watchers = [];
      }
    }

  };
};
