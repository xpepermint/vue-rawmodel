'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VueContextable = function () {
  function VueContextable() {
    _classCallCheck(this, VueContextable);
  }

  _createClass(VueContextable, null, [{
    key: 'install',
    value: function install(Vue) {

      Object.defineProperty(Vue.prototype, '$context', {
        get: function get() {
          return this.$root._context;
        }
      });

      Vue.mixin({
        beforeCreate: function beforeCreate() {
          if (this.$options.context) {
            this._context = this.$options.context;
          }
        },


        filters: {
          firstErrorMessage: function firstErrorMessage(errors) {
            var hasErrors = Array.isArray(errors) && errors.length > 0;
            return hasErrors ? errors[0].message : null;
          }
        }

      });
    }
  }]);

  return VueContextable;
}();

exports.default = VueContextable;


if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueContextable);
}