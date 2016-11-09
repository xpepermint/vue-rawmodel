'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounceAsPromised = undefined;
exports.createMixins = createMixins;

var _utils = require('./utils');

var _filters = require('./filters');

var filters = _interopRequireWildcard(_filters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
* Debounce method for delayed validation
*/

var debounceAsPromised = exports.debounceAsPromised = (0, _utils.createDebouncer)();

/*
* Component mixins.
*/

function createMixins(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return {

    /*
    * A hash of filters to be made available to the Vue instance.
    */

    filters: filters,

    /*
    * Called synchronously after the component is initialized.
    */

    beforeCreate: function beforeCreate() {
      var _this = this;

      var context = this.$options.context; // retrieve context instance
      if (context) {
        // memorize the context instance so we can retrieve it in a root component
        this._context = context;
      }

      var contextable = Object.assign({}, options, this.$options.contextable); // retrieve contextable option
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

            var delay = (0, _utils.chooseOption)([300, contextable.debounce, recipe.debounce], 'number');
            var model = new _this.$context[modelName]();

            model.$validate = function () {
              // adding configured validate method
              return debounceAsPromised(function () {
                return model.validate({ quiet: true }) // quiet must be true otherwise it throws an error
                .then(function () {
                  return _this.$forceUpdate();
                }) // calling $forceUpdate because the `validate()` method is asynchroneus
                ;
              }, delay);
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
    },


    /*
    * Called synchronously after the component is created.
    */

    created: function created() {
      this._watchers = [];

      var contextable = Object.assign({}, options, this.$options.contextable); // retrieve contextable option
      var recipies = contextable.validate; // retrieving model definitions
      if (recipies) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {

          for (var _iterator2 = recipies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var recipe = _step2.value;
            // loop through model definitions
            var dataKey = recipe.dataKey;

            var reactive = (0, _utils.chooseOption)([true, contextable.reactive, recipe.reactive], 'boolean');
            var immediate = (0, _utils.chooseOption)([false, contextable.immediate, recipe.immediate], 'boolean');
            var validate = function validate(newVal) {
              return newVal.$validate();
            };

            if (reactive) {
              this._watchers.push(this.$watch(dataKey, validate, { deep: true, immediate: immediate }) // starts watching the model for changes
              );
            }
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
    },


    /*
    * Called after the component has been destroyed.
    */

    destroyed: function destroyed() {
      if (this._watchers) {
        // unwatch the model
        this._watchers.forEach(function (unwatch) {
          return unwatch();
        });
        this._watchers = [];
      }
    }
  };
};