/*
* Contextable plugin class.
*/

export default class VueContextable {

  /*
  * Installs the Vue plugin.
  */

  static install (Vue, options = {}) {

    Object.defineProperty(Vue.prototype, '$context', { // adding a global variable `$context`
      get () { return this.$root._context } // returns the application context
    });

    Vue.mixin({ // upgrading each component with contextable

      beforeCreate () { // called synchronously after the component is initialized.
        let context = this.$options.context; // retrieve context instance
        if (context) { // memorize the context instance so we can retrieve it in a root component
          this._context = context;
        }

        let contextable = this.$options.contextable; // retrieve contextable option
        if (contextable) {

          let recipies = contextable.validate; // retrieving model definitions
          if (recipies) {

            for (let recipe of recipies) { // loop through model definitions
              let {dataKey, modelName} = recipe; // define reactive models
              let model = new this.$context[modelName]();

              model.$validate = () => { // adding configured validate method
                return model
                  .validate({quiet: true}) // quiet must be true otherwise it throws an error
                  .then(() => this.$forceUpdate()); // calling $forceUpdate because the `validate()` method is asynchroneus
              };

              Vue.util.defineReactive(this, dataKey, model); // define the model in the `data` block
            }
          }
        }
      },

      created () { // called synchronously after the component is created.
        this._watchers = [];

        let contextable = this.$options.contextable; // retrieve contextable option
        if (contextable) {

          let recipies = contextable.validate; // retrieving model definitions
          if (recipies) {

            for (let recipe of recipies) { // loop through model definitions
              let {dataKey, immediate} = recipe;
              let validate = (newVal) => newVal.$validate();
              this._watchers.push(
                this.$watch(dataKey, validate, {deep: true, immediate}) // starts watching the model for changes
              );
            }
          }
        }
      },

      destroyed () { // called after the component has been destroyed.
        if (this._watchers) { // unwatch the model
          this._watchers.forEach((unwatch) => unwatch());
        }
      },

      filters: { // a hash of filters to be made available to the Vue instance.

        firstMessage (errors) { // accepts an array of errors and returns the first error message.
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
      }

    });
  }

}

/*
* The plugin is automatically installed when loaded in browser (not as module).
*/

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueContextable);
}
