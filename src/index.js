import {createMixins} from './mixins';

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

    Vue.mixin( // upgrading all vue components
      createMixins(Vue, options)
    );
  }
}

/*
* The plugin is automatically installed when loaded in browser (not as module).
*/

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueContextable);
}
