'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mixins = require('./mixins');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* Contextable plugin class.
*/

var VueContextable = function () {
  function VueContextable() {
    _classCallCheck(this, VueContextable);
  }

  _createClass(VueContextable, null, [{
    key: 'install',


    /*
    * Installs the Vue plugin.
    */

    value: function install(Vue) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      Object.defineProperty(Vue.prototype, '$context', {
        // adding a global variable `$context`
        get: function get() {
          return this.$root._context;
        } // returns the application context

      });

      Vue.mixin( // upgrading all vue components
      (0, _mixins.createMixins)(Vue, options));
    }
  }]);

  return VueContextable;
}();

/*
* The plugin is automatically installed when loaded in browser (not as module).
*/

exports.default = VueContextable;
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueContextable);
}