'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounceAsPromised = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.defineReactiveModel = defineReactiveModel;

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Debounce method for delayed validation
*/

var debounceAsPromised = exports.debounceAsPromised = (0, _utils.createDebouncer)();

/*
* Sets a new reactive model to the reactive variable defined as `dataKey`. Note
* that this method does not define the reactive variable which holds the model,
* it's resposability of the `mixin` to define one.
*/

function defineReactiveModel(vm, config) {
  var dataKey = config.dataKey,
      modelName = config.modelName,
      modelData = config.modelData,
      debounceTime = config.debounceTime;

  var Model = vm.$context[modelName];

  /*
  * Extended contextable.js model with reactive methods.
  */

  var ReactiveModel = function (_Model) {
    (0, _inherits3.default)(ReactiveModel, _Model);

    function ReactiveModel() {
      (0, _classCallCheck3.default)(this, ReactiveModel);
      return (0, _possibleConstructorReturn3.default)(this, (ReactiveModel.__proto__ || (0, _getPrototypeOf2.default)(ReactiveModel)).apply(this, arguments));
    }

    (0, _createClass3.default)(ReactiveModel, [{
      key: '$build',


      /*
      * Rebuilds model's reactivity by recreating the model.
      */

      value: function $build() {
        return this.$populate(this.toObject());
      }

      /*
      * Reactive alternative of the `populate()` method.
      */

    }, {
      key: '$populate',
      value: function $populate(data) {
        this.populate(data);

        var modelData = this.toObject();
        return defineReactiveModel(vm, (0, _extends3.default)({}, config, { modelData: modelData }));
      }

      /*
      * Reactive alternative of the `validate()` method.
      */

    }, {
      key: '$validate',
      value: function $validate(opts) {
        var _this2 = this;

        // adding configured validate method
        var handler = function handler() {
          return _this2.validate(opts) // quiet must be true otherwise it throws an error
          .then(function () {
            return vm.$forceUpdate();
          });
        }; // calling $forceUpdate because the `validate()` method is asynchroneus
        return debounceAsPromised({ handler: handler, time: debounceTime });
      }

      /*
      * Reactive alternative of the `applyErrors()` method.
      */

    }, {
      key: '$applyErrors',
      value: function $applyErrors(errors) {
        // adding configured method for error hydrationa
        this.applyErrors(errors);
        vm.$forceUpdate();
        return this;
      }
    }]);
    return ReactiveModel;
  }(Model);

  /*
  * Setting the reactive variable (this is how vue apply changes).
  */

  return vm[dataKey] = new ReactiveModel(modelData); // set new model and trigger reactivity
}