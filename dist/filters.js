"use strict";
function firstMessage(errors) {
    if (!Array.isArray(errors)
        || errors.length === 0)
        return null;
    var error = errors[0];
    if (error.message) {
        return error.message;
    }
    else {
        return error;
    }
}
exports.firstMessage = firstMessage;
//# sourceMappingURL=filters.js.map