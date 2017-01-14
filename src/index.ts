import {ReactiveModel} from './models';
import * as filters from './filters';

/*
* RawModel class.
*/

export {ReactiveModel}

/*
* RawModel plugin class.
*/

export default class VueRawModel {

  /*
  * Installs the Vue plugin.
  */

  static install (Vue, options = {}) {
    Object.defineProperty(Vue.prototype, '$models', { // adding a global variable `$context`
      get () { return this.$root._models; } // returns the application context
    });

    Vue.mixin({
      filters,
      beforeCreate () {
        let models = this.$options.models; // retrieve context instance
        if (models) { // memorize the context instance so we can retrieve it in a root component
          this._models = models;
        }
      }
    });
  }
}

/*
* The plugin is automatically installed when loaded in browser (not as module).
*/

if (typeof window !== 'undefined' && !!window['Vue']) {
  window['Vue'].use(VueRawModel);
}
