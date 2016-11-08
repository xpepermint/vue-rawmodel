'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

      Vue.mixin({
        // upgrading each component with contextable

        beforeCreate: function beforeCreate() {
          var _this = this;

          // called synchronously after the component is initialized.
          var context = this.$options.context; // retrieve context instance
          if (context) {
            // memorize the context instance so we can retrieve it in a root component
            this._context = context;
          }

          var contextable = this.$options.contextable; // retrieve contextable option
          if (contextable) {

            var recipies = contextable.validate; // retrieving model definitions
            if (recipies) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                var _loop = function _loop() {
                  var recipe = _step.value;
                  // loop through model definitions
                  var dataKey = recipe.dataKey,
                      modelName = recipe.modelName; // define reactive models

                  var model = new _this.$context[modelName]();

                  model.$validate = function () {
                    // adding configured validate method
                    return model.validate({ quiet: true }) // quiet must be true otherwise it throws an error
                    .then(function () {
                      return _this.$forceUpdate();
                    }); // calling $forceUpdate because the `validate()` method is asynchroneus
                  };

                  Vue.util.defineReactive(_this, dataKey, model); // define the model in the `data` block
                };

                for (var _iterator = recipies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _loop();
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            }
          }
        },
        created: function created() {
          // called synchronously after the component is created.
          this._watchers = [];

          var contextable = this.$options.contextable; // retrieve contextable option
          if (contextable) {

            var recipies = contextable.validate; // retrieving model definitions
            if (recipies) {
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {

                for (var _iterator2 = recipies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var recipe = _step2.value;
                  // loop through model definitions
                  var dataKey = recipe.dataKey,
                      immediate = recipe.immediate;

                  var validate = function validate(newVal) {
                    return newVal.$validate();
                  };
                  this._watchers.push(this.$watch(dataKey, validate, { deep: true, immediate: immediate }) // starts watching the model for changes
                  );
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            }
          }
        },
        destroyed: function destroyed() {
          // called after the component has been destroyed.
          if (this._watchers) {
            // unwatch the model
            this._watchers.forEach(function (unwatch) {
              return unwatch();
            });
          }
        },


        filters: {
          // a hash of filters to be made available to the Vue instance.

          firstMessage: function firstMessage(errors) {
            // accepts an array of errors and returns the first error message.
            if (!Array.isArray(errors) || errors.length === 0) return null;

            var error = errors[0];
            if (error.message) {
              return error.message;
            } else {
              return error;
            }
          }
        }

      });
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