"use strict";
var models_1 = require("./models");
exports.ReactiveModel = models_1.ReactiveModel;
var filters = require("./filters");
var VueRawModel = (function () {
    function VueRawModel() {
    }
    VueRawModel.install = function (Vue, options) {
        if (options === void 0) { options = {}; }
        Object.defineProperty(Vue.prototype, '$models', {
            get: function () { return this.$root._models; }
        });
        Vue.mixin({
            filters: filters,
            beforeCreate: function () {
                var models = this.$options.models;
                if (models) {
                    this._models = models;
                }
            }
        });
    };
    return VueRawModel;
}());
exports.__esModule = true;
exports["default"] = VueRawModel;
if (typeof window !== 'undefined' && !!window['Vue']) {
    window['Vue'].use(VueRawModel);
}
//# sourceMappingURL=index.js.map