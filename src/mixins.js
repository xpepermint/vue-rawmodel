import {
  chooseOption,
  retrieveValue
} from './utils';
import * as filters from './filters';
import {defineReactiveModel} from './models';

/*
* Component mixins.
*/

export function createMixin (Vue, options = {}) {
  let watchers = []; // private watchers
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
          let {dataKey, modelName} = recipe;
          let debounceTime = chooseOption([300, options.debounceTime, recipe.debounceTime], 'number');
          let modelData = retrieveValue(recipe.modelData);

          Vue.util.defineReactive(this, dataKey, null); // define reactive variable for the model

          defineReactiveModel(this, { // set reactive method to reactive variable above
            dataKey,
            modelName,
            modelData,
            debounceTime
          });
        }
      }
    },

    /*
    * Called synchronously after the component is created.
    */

    created () {
      watchers = [];

      let contextable = Object.assign({}, options, this.$options.contextable); // retrieve contextable option
      let recipies = contextable.validate; // retrieving model definitions
      if (recipies) {

        for (let recipe of recipies) { // loop through model definitions
          let {dataKey} = recipe;
          let reactive = chooseOption([true, contextable.reactive, recipe.reactive], 'boolean');
          let immediate = chooseOption([false, contextable.immediate, recipe.immediate], 'boolean');
          let validate = (newVal) => newVal.$validate({quiet: true});

          if (reactive) {
            watchers.push(
              this.$watch(dataKey, validate, {deep: true, immediate}) // starts watching the model for changes
            );
          }
        }
      }
    },

    /*
    * Called after the component has been destroyed.
    */

    beforeDestroy () {
      if (watchers) { // unwatch the model
        watchers.forEach((unwatch) => unwatch());
        watchers = [];
      }
    }

  };
};
