'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mixins = require('./mixins');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Contextable plugin class.
*/

var VueContextable = function () {
  function VueContextable() {
    (0, _classCallCheck3.default)(this, VueContextable);
  }

  (0, _createClass3.default)(VueContextable, null, [{
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