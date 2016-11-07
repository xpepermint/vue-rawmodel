export default class VueContextable {

  static install (Vue) {

    Object.defineProperty(Vue.prototype, '$context', {
      get () { return this.$root._context }
    });

    Vue.mixin({

      beforeCreate () {
        if (this.$options.context) {
          this._context = this.$options.context;
        }
      },

      filters: {
        firstErrorMessage (errors) {
          let hasErrors = (
            Array.isArray(errors)
            && errors.length > 0
          );
          return hasErrors ? errors[0].message : null;
        }
      }

    });
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueContextable);
}
