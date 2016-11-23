'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.createMixin = createMixin;

var _utils = require('./utils');

var _filters = require('./filters');

var filters = _interopRequireWildcard(_filters);

var _models = require('./models');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Component mixins.
*/

function createMixin(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var watchers = []; // private watchers
  return {

    /*
    * A hash of filters to be made available to the Vue instance.
    */

    filters: filters,

    /*
    * Called synchronously after the component is initialized.
    */

    beforeCreate: function beforeCreate() {
      var context = this.$options.context; // retrieve context instance
      if (context) {
        // memorize the context instance so we can retrieve it in a root component
        this._context = context;
      }

      var contextable = (0, _extends3.default)({}, options, this.$options.contextable); // retrieve contextable option
      var recipies = contextable.validate; // retrieving model definitions
      if (recipies) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {

          for (var _iterator = (0, _getIterator3.default)(recipies), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var recipe = _step.value;
            // loop through model definitions
            var dataKey = recipe.dataKey,
                modelName = recipe.modelName;

            var debounceTime = (0, _utils.chooseOption)([300, options.debounceTime, recipe.debounceTime], 'number');
            var modelData = (0, _utils.retrieveValue)(recipe.modelData);

            Vue.util.defineReactive(this, dataKey, null); // define reactive variable for the model

            (0, _models.defineReactiveModel)(this, { // set reactive method to reactive variable above
              dataKey: dataKey,
              modelName: modelName,
              modelData: modelData,
              debounceTime: debounceTime
            });
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
      watchers = [];

      var contextable = (0, _extends3.default)({}, options, this.$options.contextable); // retrieve contextable option
      var recipies = contextable.validate; // retrieving model definitions
      if (recipies) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {

          for (var _iterator2 = (0, _getIterator3.default)(recipies), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var recipe = _step2.value;
            // loop through model definitions
            var dataKey = recipe.dataKey;

            var reactive = (0, _utils.chooseOption)([true, contextable.reactive, recipe.reactive], 'boolean');
            var immediate = (0, _utils.chooseOption)([false, contextable.immediate, recipe.immediate], 'boolean');
            var validate = function validate(newVal) {
              return newVal.$validate({ quiet: true });
            };

            if (reactive) {
              watchers.push(this.$watch(dataKey, validate, { deep: true, immediate: immediate }) // starts watching the model for changes
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

    beforeDestroy: function beforeDestroy() {
      if (watchers) {
        // unwatch the model
        watchers.forEach(function (unwatch) {
          return unwatch();
        });
        watchers = [];
      }
    }
  };
};